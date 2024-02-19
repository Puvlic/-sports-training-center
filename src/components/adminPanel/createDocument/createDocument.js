import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import PizZipUtils from 'pizzip/utils/index.js';
import { saveAs } from 'file-saver';
import competitionDocumentTemplate from "./documentTemplates/competitionDocumentTemplate.docx"
import userDocumentTemplate from "./documentTemplates/userDocumentTemplate.docx"
import trainingDocumentTemplate from "./documentTemplates/trainingDocumentTemplate.docx"
import trainingCampDocumentTemplate from "./documentTemplates/trainingCampDocumentTemplate.docx"
import {documentTypes} from "./documentTemplates/documentTypes"
import {getCompetitionById} from "./actions/competitionActions/getCompetitionById"
import {getOrganizerById} from "./actions/competitionActions/getOrganizerById";
import {getSportById} from "./actions/competitionActions/getSportById";
import {getUserById} from "./actions/userActions/getUserById";
import {getGymById, getTrainingById} from "./actions/trainingActions/trainingActions";
import {getTrainingCampById} from "./actions/trainingCampActions/trainingCampActions";

function loadFile(url, callback) {
    PizZipUtils.getBinaryContent(url, callback);
}

const months = ['Янаврья', 'Февраля', 'Марта', 'Апреля', 'Майя', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря']
export const generateDocument = async (documentType, id) => {

    let documentInfo
    let document
    let documentName = `unnamed`
    let formattedDocumentInfo = {}

    console.log(documentType)

    switch (documentType) {
        case documentTypes.competition: {
            debugger
            document = competitionDocumentTemplate
            documentInfo = await getCompetitionById(id)

            const organizer = await getOrganizerById(documentInfo.organizer_id)
            const sport = await getSportById(documentInfo.sport_id)

            formattedDocumentInfo.name = documentInfo.name
            formattedDocumentInfo.sport = sport.sport
            formattedDocumentInfo.start_date = `${documentInfo.start_date} ${months[documentInfo.month]} ${documentInfo.year} года`
            formattedDocumentInfo.duration = documentInfo.duration
            formattedDocumentInfo.location = documentInfo.location
            formattedDocumentInfo.organizer = organizer.name

            documentName = `Соревнование ${formattedDocumentInfo.name}`
            break
        }
        case documentTypes.user: {
            document = userDocumentTemplate
            documentInfo = await getUserById(id)

            formattedDocumentInfo = documentInfo
            documentName = `Пользователь ${documentInfo.surname} ${documentInfo.name} ${documentInfo.patronymic}`
            break
        }
        case documentTypes.trainings: {
            document = trainingDocumentTemplate
            documentInfo = await getTrainingById(id)

            formattedDocumentInfo = documentInfo
            documentName = `Тренировка ${formattedDocumentInfo.sport}`
            break
        }
        case documentTypes.trainingCamps: {
            document = trainingCampDocumentTemplate
            documentInfo = await getTrainingCampById(id)

            const sport = await getSportById(documentInfo.sport_id)

            formattedDocumentInfo.name = documentInfo.name
            formattedDocumentInfo.start_date = `${documentInfo.start_date} ${months[documentInfo.month]} ${documentInfo.year} года`
            formattedDocumentInfo.sport = sport.sport
            formattedDocumentInfo.duration = `${documentInfo.duration} дней`
            formattedDocumentInfo.location = documentInfo.location

            documentName = `Тренировочные сборы '${documentInfo.name}'`
            break
        }
        default:
            break
    }

    console.log(formattedDocumentInfo)

    loadFile(
        document,
        function (error, content) {
            if (error) {
                throw error;
            }
            let zip = new PizZip(content);
            let doc = new Docxtemplater(zip, {
                paragraphLoop: true,
                linebreaks: true,
            });
            doc.setData(formattedDocumentInfo);
            try {
                // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
                doc.render();
            } catch (error) {
                // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
                const replaceErrors = (key, value) => {
                    if (value instanceof Error) {
                        return Object.getOwnPropertyNames(value).reduce(function (
                                error,
                                key
                            ) {
                                error[key] = value[key];
                                return error;
                            },
                            {});
                    }
                    return value;
                };
                console.log(JSON.stringify({error: error}, replaceErrors));

                if (error.properties && error.properties.errors instanceof Array) {
                    const errorMessages = error.properties.errors
                        .map(function (error) {
                            return error.properties.explanation;
                        })
                        .join('\n');
                    console.log('errorMessages', errorMessages);
                    // errorMessages is a humanly readable message looking like this :
                    // 'The tag beginning with "foobar" is unopened'
                }
                throw error;
            }
            var out = doc.getZip().generate({
                type: 'blob',
                mimeType:
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            }); //Output the document using Data-URI
            saveAs(out, documentName + '.docx');
        }
    );
};