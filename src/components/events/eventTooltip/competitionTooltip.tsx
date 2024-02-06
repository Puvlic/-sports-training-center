import React from 'react';
import {ICompetition} from "../../../types/calendarTypes";
import style from './eventTooltip.module.scss'

type PropsType = ICompetition

const months = ['Янаврь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']

const EventTooltip: React.FC <PropsType> = (competition) => {
    return (
        <div className={style.tooltip_wrapper}>
            <h2>{competition.name}</h2>
            <div>Дата начала: {months[competition.month]} {competition.start_date}</div>
            <div>Длительность {competition.duration} дней</div>
        </div>
    );
};

export default EventTooltip;