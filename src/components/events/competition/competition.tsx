import React, {useEffect, useState} from 'react';
import {GetCompetitionAsync, GetUserOnCompetitionAsync, RemoveUserOnCamp, addUserOnCamp, getSportName} from "./getCompetition";
import style from "../eventPage/eventPage.module.scss";
import {ICompetition} from "../../../types/calendarTypes";
import Cookies from "universal-cookie";
import {NavLink} from "react-router-dom";

const months = ['Янаваря', 'Февраля', 'Марта', 'Апреля', 'Майя', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря']

interface IUserOnCompetition {
    user_id: number,
    competition_id: number,
    palace: string | null
}

const Competition = () => {

    const cookies = new Cookies()
    const jwt = cookies.get("jwt")

    let user_id: number

    if (jwt) {
        user_id = Number(JSON.parse(atob(jwt.split('.')[1])).id)
    }

    const competitionId = Number(window.location.href.split('/')[4])
    const [competitionInfo, setCompetitionInfo] = useState<ICompetition>()
    const [userOnCompetition, setUserOnCompetition] = useState<IUserOnCompetition[]>()
    const [sportsmenOnCompetition, setSportsmenOnCompetition] = useState<IUserOnCompetition | null>()
    const [sportName, setSportName] = useState<string>()

    useEffect(() => {
        const getCompetition = async () => {
            const acquiredCompetition = await GetCompetitionAsync(competitionId)
            setCompetitionInfo(acquiredCompetition)
        }

        getCompetition().then()
    }, [])

    useEffect(() => {
        const getUserCompetition = async () => {
            const acquiredCompetition = await GetUserOnCompetitionAsync(user_id)
            setUserOnCompetition(acquiredCompetition)
        }

        getUserCompetition().then()
    }, [])

    useEffect(() => {
        setSportsmenOnCompetition(userOnCompetition?.find(member => member.user_id === user_id))
    }, [userOnCompetition])

    const getSport = async () => {
        let sport = await getSportName(Number(competitionInfo?.sport_id))
        setSportName(sport)
    }

    if (!isNaN(Number(competitionInfo?.sport_id))) {
        getSport().then()
    }

    const addUserOnCompetitionHandler = () => {
        addUserOnCamp(user_id, competitionId).then(async () => {
            const acquiredCompetition = await GetUserOnCompetitionAsync(user_id)
            setUserOnCompetition(acquiredCompetition)
        })
    }

    const UserOnCompetitionHandler = () => {
        RemoveUserOnCamp(user_id, competitionId).then(async () => {
            const acquiredCompetition = await GetUserOnCompetitionAsync(user_id)
            setUserOnCompetition(acquiredCompetition)
        })
    }

    return (
        <>
            <div className={style.button_margin}>
                <NavLink to='/events' className={style.back_button}>
                    <button>Назад</button>
                </NavLink>
            </div>

            <div className={style.event_page_wrapper}>
                <h2>{competitionInfo?.name}</h2>
                <div className={style.eventInfo}>
                    <p>Дата начала: {competitionInfo?.start_date} {months[competitionInfo!?.month]}</p>
                    <p>Вид спорта: {sportName}</p>
                    <p>Продолжительность: {competitionInfo?.duration} дней</p>
                    <p>Место проведения: {competitionInfo?.location}</p>
                    {sportsmenOnCompetition ?
                        <button className={style.event_page_button} onClick={UserOnCompetitionHandler}>Отписаться</button>
                        :
                        <button className={style.event_page_button}
                                onClick={addUserOnCompetitionHandler}>Записаться</button>
                    }
                </div>
            </div>
        </>

    );
};

export default Competition;