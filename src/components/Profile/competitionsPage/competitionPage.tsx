import React, {useEffect, useState} from 'react';
import {ICompetition} from "../../../types/calendarTypes";
import {RemoveUserOnCamp} from "../../events/competition/getCompetition"
import {getCompetitions} from "./getCompetitions"
import local_style from "../trainings/trainingsPage.module.scss";
import {NavLink} from "react-router-dom";
import style from "../../trainings/trainings.module.scss";
import Cookies from "universal-cookie";

const months = ['Янаваря', 'Февраля', 'Марта', 'Апреля', 'Майя', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря']

const CompetitionPage = () => {

    const cookies = new Cookies()
    const jwt = cookies.get("jwt")

    let user_id: number

    if (jwt) {
        user_id = Number(JSON.parse(atob(jwt.split('.')[1])).id)
    }

    const [competitions, setCompetitions] = useState<ICompetition[]>()

    useEffect(() => {
        const getUserCompetition = async () => {
            const comps = await getCompetitions(user_id)
            setCompetitions(comps)
        }

        getUserCompetition().then()
    }, [])

    const RemoveCompetition = (user_id: number, competition_id: number) => {
        RemoveUserOnCamp(user_id, competition_id).then(async () => {
            const comps = await getCompetitions(user_id)
            setCompetitions(comps)
        })
    }

    return (
        <div>
            <div className={local_style.button_margin}>
                <NavLink to={`/profile`} className={local_style.back_button}>
                    <button>Назад</button>
                </NavLink>
            </div>
            <div>
                {competitions?.map(training => (
                    <div key={training.id} className={style.training_block}>
                        <p className={style.sport_name}>{training.name}</p>
                        <p>Тренер: {training.location}</p>
                        <p>Дата начала: {training?.start_date} {months[training!?.month]}</p>
                        <p>Продолжительность: {training.duration} дней</p>
                        <button onClick={() => RemoveCompetition(user_id, training.id)}>Отписаться</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CompetitionPage;