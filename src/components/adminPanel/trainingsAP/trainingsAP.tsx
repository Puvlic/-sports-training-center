import React from 'react';
import {useActions} from "../../../hooks/useActions";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {ITraining, ITrainingsState} from "../../../types/trainingsTypes";
import style from './trainingsAP.module.scss'
import {NavLink} from "react-router-dom";

interface ITrainingAP {
    trainings: ITraining[]
}

const TrainingsAP: React.FC<ITrainingAP> = (props) => {

    return (
        <>
            {props.trainings.map(training => (
                <div className={style.training_block} key={training.id}>
                    <div >
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
                        <NavLink to='/profile/admin_panel/document_creator'>
                            <button className={style.link_button}>
                                Создать отчет
                            </button>
                        </NavLink>
                    </div>
                </div>
            ))}
        </>
    );
};

export default TrainingsAP;