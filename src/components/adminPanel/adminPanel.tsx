import React, {useEffect, useState} from 'react';
import style from './adminPanel.module.scss'
import TrainingsAP from "./trainingsAP/trainingsAP";
import {useActions} from "../../hooks/useActions";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {ITraining} from "../../types/trainingsTypes";
import CompetitionsAP from "./competitionsAP/competitionsAP";
import {ICompetition, IEvent} from "../../types/calendarTypes";
import {getSportName} from "../events/competition/getCompetition";
import TrainingCampsAP from "./trainingCampsAP/trainingCampsAP";
import UsersAP from "./usersAP/usersAP";
import {IUser} from "../../types/userTypes";
import {getAllUsers} from "./getUsers";

interface ITrainingProps {
    trainings: ITraining[]
}

interface ITrainingCampsProps {
    trainingCamps: IEvent[] | null
}

interface ICompetitionProps {
    competitions: ICompetition[] | null
}

interface IUsersProps {
    users: IUser[] | null
}

const activeInset = {
    class: style.inset_active,
    active: true,
}

const inactiveInset = {
    class: "",
    active: false,
}

const AdminPanel = () => {

    const {fetchTrainings, fetchCompetitions, fetchTrainingCamps} = useActions()
    const {trainings, loading} = useTypedSelector(state => state.trainings)
    const {competitions, events} = useTypedSelector(state => state.calendar)
    const [users, setUsers] = useState<IUsersProps>({
        users: []
    })

    const trainingsProps: ITrainingProps = {
        trainings: trainings
    }

    const trainingCampsProps: ITrainingCampsProps = {
        trainingCamps: events
    }

    const competitionProps: ICompetitionProps = {
        competitions: competitions
    }

    useEffect(() => {
        fetchTrainings()
    }, []);

    useEffect(() => {
        fetchCompetitions()
    }, []);

    useEffect(() => {
        fetchTrainingCamps()
    }, []);

    useEffect(() => {
        const getUsers = async () => {
            let users = await getAllUsers()
            setUsers({
                users: users
            })
        }

        getUsers().then()
    }, [])

    const [insetsParams, setInsetsParams] = useState({
        trainings: activeInset,
        camps: inactiveInset,
        competitions: inactiveInset,
        users: inactiveInset,
    })


    const changeActiveInset = (inset: string) => {
        switch (inset) {
            case "trainings":
                setInsetsParams({
                    trainings: activeInset,
                    camps: inactiveInset,
                    competitions: inactiveInset,
                    users: inactiveInset,
                })
                break
            case "camps":
                setInsetsParams({
                    trainings: inactiveInset,
                    camps: activeInset,
                    competitions: inactiveInset,
                    users: inactiveInset,
                })
                break
            case "competitions":
                setInsetsParams({
                    trainings: inactiveInset,
                    camps: inactiveInset,
                    competitions: activeInset,
                    users: inactiveInset,
                })
                break
            case "users":
                setInsetsParams({
                    trainings: inactiveInset,
                    camps: inactiveInset,
                    competitions: inactiveInset,
                    users: activeInset,
                })
                break
            default:
                break
        }
    }

    if (loading) {
        return (
            <div className='preloader'></div>
        )
    }

    return (
        <div className={style.wrapper}>
            <div className={style.button_block}>
                <ul className={style.button_list}>
                    <li className={insetsParams.trainings.class} onClick={() => changeActiveInset("trainings")}>
                        Тренировки
                    </li>
                    <li className={insetsParams.camps.class} onClick={() => changeActiveInset("camps")}>
                        Сборы
                    </li>
                    <li className={insetsParams.competitions.class} onClick={() => changeActiveInset("competitions")}>
                        Соревнования
                    </li>
                    <li className={insetsParams.users.class} onClick={() => changeActiveInset("users")}>
                        Пользователи
                    </li>
                </ul>
            </div>
            <div>
                {insetsParams.trainings.active && (
                    <TrainingsAP {...trainingsProps}/>
                )}
                {insetsParams.camps.active && (
                    <TrainingCampsAP {...trainingCampsProps}/>
                )}
                {insetsParams.competitions.active && (
                    <CompetitionsAP {...competitionProps}/>
                )}
                {insetsParams.users.active && (
                    <UsersAP {...users}/>
                )}
            </div>
        </div>
    );
};

export default AdminPanel;