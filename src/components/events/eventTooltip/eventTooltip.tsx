import React from 'react';
import {IEvent} from "../../../types/calendarTypes";
import style from './eventTooltip.module.scss'

type PropsType = IEvent

const months = ['Янаврь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']

const EventTooltip: React.FC <PropsType> = (event) => {
    return (
        <div className={style.tooltip_wrapper}>
            <h2>{event.name}</h2>
            <div>Дата начала: {months[event.month]} {event.start_date}</div>
            <div>Длительность {event.duration} дней</div>
        </div>
    );
};

export default EventTooltip;