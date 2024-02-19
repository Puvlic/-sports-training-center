import React from 'react';
import {IEvent} from "../../../types/calendarTypes";
import style from "./trainingCampsAP.module.scss"
import {NavLink} from "react-router-dom";
import {generateDocument} from "../createDocument/createDocument";
import {documentTypes} from "../createDocument/documentTemplates/documentTypes";

interface ITrainingCampsAP {
    trainingCamps: IEvent[] | null
}

const months = ['Янаваря', 'Февраля', 'Марта', 'Апреля', 'Майя', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря']

const TrainingCampsAP: React.FC<ITrainingCampsAP> = (props) => {
    return (
        <>
            {props.trainingCamps?.map(trainingCamp => (
                <div className={style.event_block}>
                    <div>
                        <p className={style.training_camp_name}>{trainingCamp.name}</p>
                        <p>Дата начала: {trainingCamp.start_date} {months[trainingCamp.month]}</p>
                        <p>Продолжительность: {trainingCamp.duration} дней</p>
                        <p>Место проведения: {trainingCamp.location}</p>
                    </div>
                    <div className={style.button_block}>
                        <NavLink to='/profile/admin_panel/copetition/:id/users'>
                            <button className={style.button}>
                                Список участников
                            </button>
                        </NavLink>
                        <button className={style.button} onClick={() => generateDocument(documentTypes.trainingCamps, trainingCamp.id)}>
                            Создать отчет
                        </button>
                    </div>
                </div>
            ))}
        </>
    );
};

export default TrainingCampsAP;