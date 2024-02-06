import React, {useEffect, useState} from 'react';
import {getUserTrainings, deleteUserFromTraining} from "../../trainings/getUserTrainings"
import {getUserTrainingsList} from "./getUserTrainings"
import Cookies from "universal-cookie";
import {useActions} from "../../../hooks/useActions";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import style from "../../trainings/trainings.module.scss";
import local_style from "./trainingsPage.module.scss"
import {NavLink} from "react-router-dom";

interface ITraining {
    id: number,
    start_time: string,
    end_time: string,
    trainer: string,
    sport: string,
    gym: string,
}

const TrainingsPage = () => {

    const cookies = new Cookies()
    const jwt = cookies.get("jwt")

    let user_id: number

    if (jwt) {
        user_id = Number(JSON.parse(atob(jwt.split('.')[1])).id)
    }

    const {fetchTrainings, SetLoginAndRegisterWindowActive} = useActions()
    const {user} = useTypedSelector(state => state.user)
    const [userTrainingsID, setUserTrainingsID] = useState<number[]>([])
    const [userTrainings, setUserTrainings] = useState<ITraining[]>([])

    useEffect(() => {
        fetchTrainings()
    }, [user]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const getTrainings = async () => {
            const trainings = await getUserTrainingsList(user_id)
            setUserTrainings(trainings)
        }

        getTrainings().then()
    }, [])

    useEffect(() => {
        const getTrainingsID = async () => {
            if (jwt) {
                const trainingsID = await getUserTrainings(user_id)
                setUserTrainingsID(trainingsID)
            }
        }
        getTrainingsID().then()
    }, [user])

    const unsubscribeButtonHandler = (training_id: number) => {
        deleteUserFromTraining(user_id, training_id).then(async () => {
            const trainings = await getUserTrainingsList(user_id)
            setUserTrainings(trainings)
        })
    }

    if (userTrainings.length === 0) {
        return (
            <div className={local_style.empty_training_camp_title}>
                Список пуст
                <NavLink to={`/profile`} className={local_style.back_button}>
                    <button>Назад</button>
                </NavLink>
            </div>
        )
    }

    return (
        <div>
            <div className={local_style.button_margin}>
                <NavLink to={`/profile`} className={local_style.back_button}>
                    <button>Назад</button>
                </NavLink>
            </div>
            <div>
                {userTrainings.map(training => (
                    <div key={training.id} className={style.training_block}>
                        <p className={style.sport_name}>{training.sport}</p>
                        <p>{training.gym}</p>
                        <p>Тренер: {training.trainer}</p>
                        <p>Время проведения: {training.start_time} - {training.end_time}</p>
                        <button onClick={() => unsubscribeButtonHandler(training.id)}>Отписаться</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrainingsPage;