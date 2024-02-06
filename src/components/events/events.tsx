import React, {useEffect, useRef} from 'react';
import {useActions} from "../../hooks/useActions";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import style from "./events.module.scss"
import {ReactComponent as Point} from "../../icons/point.svg";
import EventTooltip from "./eventTooltip/eventTooltip";
import {NavLink} from "react-router-dom";
import CompetitionTooltip from "./eventTooltip/competitionTooltip";

// const Month = {
//     0: "Январь" ,
//     1: "Февраль" ,
//     2: "Март" ,
//     3: "Апрель" ,
//     4: "Май" ,
//     5: "Июнь" ,
//     6: "Июль" ,
//     7: "Август" ,
//     8: "Сентябрь" ,
//     9: "Октябрь" ,
//     10: "Ноябрь" ,
//     11: "Декабрь" ,
// }

const days_names = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
const months = ['Янаврь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
const years = [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]

const Events = () => {

    const eventElement = useRef<(HTMLDivElement | null)[]>([])
    const competitionElement = useRef<(HTMLDivElement | null)[]>([])

    const {
        fetchCalendarDays,
        fetchCalendarYear,
        fetchCalendarMonth,
        fetchTrainingCamps,
        fetchCompetitions
    } = useActions()
    const {days, year, month, loading, events, competitions} = useTypedSelector(state => state.calendar)

    if (days) {
        for (let i = 0; i < days.length; i++) {
            eventElement.current[i] = null
            eventElement.current[i] = null
        }
    }

    useEffect(() => {
        const date = new Date()
        let year = date.getFullYear()
        let month = date.getMonth()
        fetchCalendarYear(year)
        fetchCalendarMonth(month)
        fetchTrainingCamps()
        fetchCompetitions()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps


    useEffect(() => {
        fetchCalendarDays(Number(year), Number(month))
    }, [year, month]) // eslint-disable-line react-hooks/exhaustive-deps

    // const changeMonthSelectElement = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     const month_number = Number(e.target.value)
    //     let new_month = months[month_number]
    //     fetchCalendarMonth(Number(new_month))
    // }

    const incrementMonthCount = () => {
        let new_month = Number(month) + 1
        if (new_month > 11) {
            let new_year = Number(year) + 0
            if (new_year === years[years.length - 1]) {
                return
            }
            new_year += 1
            fetchCalendarMonth(0)
            fetchCalendarYear(new_year)
        } else {
            fetchCalendarMonth(new_month)
        }
    }

    const decrementMonthCount = () => {
        let new_month = Number(month) - 1
        if (new_month < 0) {
            let new_year = Number(year) + 0
            if (new_year === years[0]) {
                return
            }
            new_year -= 1
            fetchCalendarMonth(11)
            fetchCalendarYear(new_year)
        } else {
            fetchCalendarMonth(new_month)
        }
    }

    const handleEventMouseEnter = (index: number) => {
        if (eventElement.current[index]) {
            eventElement.current[index]!.className = `${style.event_tooltip} ${style.event_tooltip_opened}`
        }
    }

    const handleEventMouseOut = (index: number) => {
        if (eventElement.current[index]) {
            eventElement.current[index]!.className = `${style.event_tooltip}`
        }
    }

    const handleCompetitionMouseEnter = (index: number) => {
        if (competitionElement.current[index]) {
            competitionElement.current[index]!.className = `${style.competition_tooltip} ${style.competition_tooltip_opened}`
        }
    }

    const handleCompetitionMouseOut = (index: number) => {
        if (competitionElement.current[index]) {
            competitionElement.current[index]!.className = `${style.competition_tooltip}`
        }
    }

    if (loading) {
        return (
            <div className='preloader'></div>
        )
    }

    return (
        <div>
            <div className={style.button_block}>
                <button className={style.month_change_button} onClick={decrementMonthCount}>{'<'}</button>

                <select value={Number(year)} className={style.calendar_select}
                        onChange={e => fetchCalendarYear(Number(e.target.value))} name='days_list'>
                    {years.map((year, index) => (
                        <option key={index} value={year}>
                            {year}
                        </option>

                    ))}
                </select>

                <select value={Number(month)} className={style.calendar_select}
                        onChange={e => fetchCalendarMonth(Number(e.target.value))}>
                    {months.map((one_month, index) => month === index ?
                        <option key={index} value={index}>{one_month}</option>
                        :
                        <option key={index} value={index}>{one_month}</option>
                    )}
                </select>

                <button className={style.month_change_button} onClick={incrementMonthCount}>{'>'}</button>
            </div>

            <div className={style.event_example_wrapper}>
                <div className={style.event_example}>
                    <Point className={style.competition_event_point} width="30" height="30"></Point>
                    Соревнование
                </div>
                <div className={style.event_example}>
                    <Point className={style.event_point} width="30" height="30"></Point>
                    Тренировночные сборы
                </div>
            </div>

            <table className={style.calendar_wrapper}>
            <thead>
                <tr>
                    {days_names.map(day =>
                        <th className={style.cell_title} key={day}>{day}</th>
                    )}
                </tr>
                </thead>

                <tbody>
                {days?.map((week, index) =>
                    <tr className={style.calendar_cell_wrapper} key={index}>
                        {week.map((date, index) => date ?
                            <td key={index} className={style.calendar_cell}>
                                <div className={style.calendar_day}>
                                    {date.getDate()}
                                </div>
                                <div className={style.events_block}>
                                    {events?.map((event, index) => event.year === year && event.month === month && Number(event.start_date) === date?.getDate() ?
                                        <div className={style.day_have_event} key={index}>
                                            <NavLink to={'/events/' + event.id} className={style.event_point_wrapper}
                                                     onMouseEnter={() => handleEventMouseEnter(index)}
                                                     onMouseOut={() => handleEventMouseOut(index)}>
                                                <Point className={style.event_point} width="30" height="30"/>
                                            </NavLink>
                                            <div className={style.event_tooltip}
                                                 ref={ref => eventElement.current[index] = ref}>
                                                <EventTooltip {...event} ></EventTooltip>
                                            </div>

                                        </div>
                                        :
                                        <div></div>
                                    )}

                                    {competitions?.map((competition, index) => competition.year === year && competition.month === month && Number(competition.start_date) === date?.getDate() ?
                                        <div className={style.day_have_event} key={index}>
                                            <NavLink to={'/competition/' + competition.id} className={style.event_point_wrapper}
                                                     onMouseEnter={() => handleCompetitionMouseEnter(index)}
                                                     onMouseOut={() => handleCompetitionMouseOut(index)}>
                                                <Point className={style.competition_event_point} width="30" height="30"/>
                                            </NavLink>
                                            <div className={style.competition_tooltip}
                                                 ref={ref => competitionElement.current[index] = ref}>
                                                <CompetitionTooltip {...competition} ></CompetitionTooltip>
                                            </div>

                                        </div>
                                        :
                                        <div></div>
                                    )}
                                </div>
                            </td>
                            :
                            <td key={index}></td>
                        )}
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default Events;