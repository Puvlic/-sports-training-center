import React, {useEffect, useState} from 'react';
import style from './trainingsPage.module.scss'
import {GetTrainingCampsByUserId} from "./getTrainingCampsByUserId";
import {IEvent} from "../../../types/calendarTypes";
import {NavLink} from "react-router-dom";

const TrainingCampsPage = () => {

    const [trainingCamps, setTrainingCamps] = useState<IEvent[]>([])

    useEffect(() => {
        let receivedTrainingCamps: any
        const getTrainingCamps = async () => {
            receivedTrainingCamps = await GetTrainingCampsByUserId(13)
            setTrainingCamps(receivedTrainingCamps)
        }
        getTrainingCamps().then()
    }, [])

    if (trainingCamps.length === 0) {
        return (
            <div className={style.empty_training_camp_title}>
                Список пуст
                <NavLink to={`/profile`} className={style.back_button}>
                    <button>Назад</button>
                </NavLink>
            </div>
        )
    }

    return (
        <div className={style.training_camps_wrapper}>
            <div className={style.button_margin}>
                <NavLink to={`/profile`} className={style.back_button}>
                    <button>Назад</button>
                </NavLink>
            </div>

            {trainingCamps.map((camp, id) => (
                <div key={id} className={style.training_camp_block}>
                    <p className={style.training_camp_name}>
                        <NavLink to={`/events/${camp.id}`}>
                            {camp.name}
                        </NavLink>
                    </p>
                    <p>Место проведения: {camp.location}</p>
                    <p>Дата начала: {camp.year}-{camp.month}-{camp.start_date}</p>
                    <p>Продолжительность: {camp.duration} дней</p>
                </div>
            ))}
        </div>
    );
};

export default TrainingCampsPage;