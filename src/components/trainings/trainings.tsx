import React, {useEffect, useState} from 'react';
import {useActions} from "../../hooks/useActions";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import style from "./trainings.module.scss"
import Cookies from "universal-cookie";
import {getUserTrainings, addUserInTraining, deleteUserFromTraining} from "./getUserTrainings"

const Trainings = () => {

    const cookies = new Cookies()
    const jwt = cookies.get("jwt")

    let user_id: number

    if (jwt) {
        user_id = Number(JSON.parse(atob(jwt.split('.')[1])).id)
    }

    const {fetchTrainings, SetLoginAndRegisterWindowActive} = useActions()
    const {trainings, loading, error} = useTypedSelector(state => state.trainings)
    const {user} = useTypedSelector(state => state.user)
    const [userTrainingsID, setUserTrainingsID] = useState<number[]>([])

    useEffect(() => {
        fetchTrainings()
    }, [user]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const getTrainingsID = async () => {
            if (jwt) {
                const trainingsID = await getUserTrainings(user_id)
                setUserTrainingsID(trainingsID)
            }
        }
        getTrainingsID().then()
    }, [user])

    console.log(userTrainingsID)

    const subscribeButtonHandler = async (user_id: number, training_id: number) => {
        if (!jwt) {
            SetLoginAndRegisterWindowActive(true)
            return
        }

        addUserInTraining(user_id, training_id).then(async () => {
            const trainingsID = await getUserTrainings(user_id)
            setUserTrainingsID(trainingsID)
        })

    }

    const unsubscribeButtonHandler = async (user_id: number, training_id: number) => {
        deleteUserFromTraining(user_id, training_id).then(async () => {
            const trainingsID = await getUserTrainings(user_id)
            setUserTrainingsID(trainingsID)
        })

    }

    if (loading) {
        return (
            <div className='preloader'></div>
        )
    }

    return (
        <div>
            {trainings.map(training => (
                <div key={training.id} className={style.training_block}>
                    <p className={style.sport_name}>{training.sport}</p>
                    <p>{training.gym}</p>
                    <p>Тренер: {training.trainer}</p>
                    <p>Время проведения: {training.start_time} - {training.end_time}</p>
                    {userTrainingsID.some(id => id === training.id) && jwt ?
                        <button onClick={() => unsubscribeButtonHandler(user_id, training.id)}>Отписаться</button>
                        :
                        <button onClick={() => subscribeButtonHandler(user_id, training.id)}>Записаться</button>
                    }
                </div>
            ))}
        </div>
    );
};

export default Trainings;