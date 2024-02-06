import {Dispatch} from "react";
import {CalendarAction, CalendarActionTypes} from "../../types/calendarTypes";
import axios from "axios";
import {api_url} from "../../api_url";


const DAYS_IN_WEEK = 7

const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

const Mouth = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
}

const isLeapYear = (year: number) => {
    return !((year % 4) || (!(year % 100) && (year % 400)))
}

const getDaysInMonth = (year: number, month: number) => {
    const daysInMonth = DAYS_IN_MONTH[month]

    if (isLeapYear(year) && month === Mouth.February) {
        return daysInMonth + 1
    } else {
        return daysInMonth
    }
}

const getDateOfWeek = (year: number, month: number) => {
    const current_data = new Date(year, month, 1)
    const month_first_day = current_data.getDay()

    if (month_first_day === 0) return 6

    return month_first_day - 1
}

const getMonthData = (year: number, month: number) => {
    const result: (Date | undefined)[][] = []
    const days_in_month = getDaysInMonth(year, month)
    const month_start_on = getDateOfWeek(year, month)
    let day = 1

    for (let i = 0; i < (days_in_month + month_start_on) / DAYS_IN_WEEK; i++) {
        result[i] = []

        for (let j = 0; j < DAYS_IN_WEEK; j++) {
            if ((i === 0 && j < month_start_on) || day > days_in_month) {
                result[i][j] = undefined
            } else {
                result[i][j] = new Date(year, month, day++)
            }
        }
    }

    return result
}

export const fetchCalendarYear = (year: number) => {
    return (dispatch: Dispatch<CalendarAction>) => {
        dispatch({type: CalendarActionTypes.fetchCalendarYear, payload: year})
    }
}

export const fetchCalendarMonth = (month: number) => {
    return (dispatch: Dispatch<CalendarAction>) => {
        dispatch({type: CalendarActionTypes.fetchCalendarMonth, payload: month})
    }
}

export const fetchCalendarDays = (year: number, month: number) => {
    return async (dispatch: Dispatch<CalendarAction>) => {
        let month_dates: (Date | undefined)[][] = getMonthData(year, month)

        dispatch({type: CalendarActionTypes.fetchCalendarDays, payload: month_dates})
    }
}

export const fetchTrainingCampsByYearAndMonth = (year: number, month: number) => {
    console.log(year, month)
    debugger
    return async (dispatch: Dispatch<CalendarAction>) => {
        try {
            const training_camps = await axios.get(`${api_url}/training-camp/get-by-year-and-month`, {
                    params: {
                        year: year,
                        month: month
                    }
                }
            )
            dispatch({type: CalendarActionTypes.fetchCalendarLoading, payload: training_camps.data})
            setTimeout(() => {
                dispatch({type: CalendarActionTypes.fetchCalendarCells, payload: training_camps.data})
            }, 1500)

        } catch (e) {
            dispatch({type: CalendarActionTypes.fetchCalendarError, payload: "Ошибка подключения к серверу"})
        }
    }
}

export const fetchTrainingCamps = () => {
    return async (dispatch: Dispatch<CalendarAction>) => {
        try {
            const training_camps = await axios.get(`${api_url}/training-camp/get-all`)
            for (let i = 0; i < training_camps.data.length; i++) {
                training_camps.data[i].type = "TRAINING-CAMP"
            }
            dispatch({type: CalendarActionTypes.fetchCalendarLoading, payload: training_camps.data})
            setTimeout(() => {
                dispatch({type: CalendarActionTypes.fetchCalendarCells, payload: training_camps.data})
            }, 1500)

        } catch (e) {
            dispatch({type: CalendarActionTypes.fetchCalendarError, payload: "Ошибка подключения к серверу"})
        }
    }
}

export const fetchCompetitions = () => {
    return async (dispatch: Dispatch<CalendarAction>) => {
        try {
            const competitions = await axios.get(`${api_url}/get-all-competitions`)
            for (let i = 0; i < competitions.data.length; i++) {
                competitions.data[i].type = "COMPETITION"
            }
            dispatch({type: CalendarActionTypes.fetchCalendarLoading, payload: competitions.data})
            setTimeout(() => {
                dispatch({type: CalendarActionTypes.fetchCalendarCompetitions, payload: competitions.data})
            }, 1500)
        } catch (e) {
            dispatch({type: CalendarActionTypes.fetchCalendarError, payload: "Ошибка подключения к серверу"})
        }
    }
}

export const fetchCalendarLoading = () => {
    return (dispatch: Dispatch<CalendarAction>) => {
        dispatch({type: CalendarActionTypes.fetchCalendarLoading, payload: true})

        setTimeout(() => {
            dispatch({type: CalendarActionTypes.fetchCalendarLoading, payload: false})
        }, 1000)
    }
}