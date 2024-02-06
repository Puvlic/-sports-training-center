import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from "react-redux";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {IEvent} from "../../../types/calendarTypes";
import {useActions} from "../../../hooks/useActions";
import style from './eventPage.module.scss'
import {ITrainingCampMember} from "../../../types/trainingCampTypes";
import {NavLink} from "react-router-dom";

const months = ['Янаваря', 'Февраля', 'Марта', 'Апреля', 'Майя', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря']

const EventPage = () => {

    const eventId = Number(window.location.href.split('/')[4])

    const {events} = useTypedSelector(state => state.calendar)
    const {user} = useTypedSelector(state => state.user)
    const {trainingCampMembers, error} = useTypedSelector(state => state.training_camp)
    const [activeEvent, setActiveEvent] = useState<IEvent | null>(null)
    const [trainingCampMembersGetting, setTrainingCampMembersGetting] = useState<boolean>(true)
    const [userOnCamp, setUserOnCamp] = useState<boolean>(false)
    const [onLoad, setOnLoad] = useState<boolean>(false)

    const {
        fetchTrainingCamps,
        SetLoginAndRegisterWindowActive,
        fetchTrainingCampMembers,
        singUpTrainingCamp,
        singOutTrainingCamp,
    } = useActions()

    useEffect(() => {
        fetchTrainingCampMembers(eventId)
        setOnLoad(true)
    }, [trainingCampMembersGetting])

    useEffect(() => {
        fetchTrainingCamps()
    }, [])

    if (onLoad) {
        const member = trainingCampMembers?.find(member => member.user_id === user?.id)
        if (member) {
            setUserOnCamp(true)
            setOnLoad(false)
        }
    }

    if (events && activeEvent === null) {
        const event = events.find(event => event.id === eventId)
        if (event) {
            setActiveEvent(event)
        }
    }

    const registrationForTrainingCamp = (training_camp_id: number, user_id: number) => {
        if (user === null) {
            SetLoginAndRegisterWindowActive(true)
            return
        }
        singUpTrainingCamp(training_camp_id, user_id)
        setTrainingCampMembersGetting(prevState => !prevState)
        setUserOnCamp(true)
    }

    const unregistrationFromTrainingCamp = (training_camp_id: number, user_id: number) => {
        singOutTrainingCamp(training_camp_id, user_id)
        //setTrainingCampMembersGetting(prevState => !prevState)
        setUserOnCamp(false)
    }

    if (activeEvent === null) {
        return (
            <div className='preloader'></div>
        )
    }

    return (
        <>
            <div className={style.button_margin}>
                <NavLink to='/events' className={style.back_button}>
                    <button>Назад</button>
                </NavLink>
            </div>

            <div className={style.event_page_wrapper}>
                <h2>{activeEvent!.name}</h2>
                <div className={style.eventInfo}>
                    <p>Дата начала: {activeEvent!.start_date} {months[activeEvent!.month]}</p>
                    <p>Продолжительность: {activeEvent!.duration} дней</p>
                    <p>Место проведения: {activeEvent!.location}</p>
                    {userOnCamp && user ?
                        <button className={style.event_page_button}
                                onClick={() => unregistrationFromTrainingCamp(eventId, Number(user?.id))}>Отписаться</button>
                        :
                        <button className={style.event_page_button}
                                onClick={() => registrationForTrainingCamp(eventId, Number(user?.id))}>Записаться</button>
                    }

                </div>
            </div>
        </>
    );
};

export default EventPage;