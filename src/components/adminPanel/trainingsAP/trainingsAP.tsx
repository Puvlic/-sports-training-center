import React from 'react';
import {useActions} from "../../../hooks/useActions";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {ITraining, ITrainingsState} from "../../../types/trainingsTypes";
import style from './trainingsAP.module.scss'
import {NavLink} from "react-router-dom";
import {generateDocument} from "../createDocument/createDocument";
import {documentTypes} from "../createDocument/documentTemplates/documentTypes";

interface ITrainingAP {
    trainings: ITraining[]
}

const TrainingsAP: React.FC<ITrainingAP> = (props) => {

    return (
        <>
            {props.trainings.map(training => (
                <div className={style.training_block} key={training.id}>
                    <div>
                        <p className={style.sport_name}>{training.sport}</p>
                        <p>{training.gym}</p>
                        <p>{training.trainer}</p>
                        <p>Время проведения: {training.start_time} - {training.end_time}</p>
                    </div>
                    <div className={style.button_block}>
                        <NavLink to='/profile/admin_panel/copetition/:id/users'>
                            <button className={style.link_button}>
                                Список участников
                            </button>
                        </NavLink>
                        <button className={style.link_button} onClick={() => generateDocument(documentTypes.trainings, training.id)}>
                            Создать отчет
                        </button>
                    </div>
                </div>
            ))}
        </>
    );
};

export default TrainingsAP;