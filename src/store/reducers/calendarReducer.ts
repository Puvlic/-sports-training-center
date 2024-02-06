import {CalendarAction, CalendarActionTypes, ICalendarInitialState} from "../../types/calendarTypes";

const InitialState: ICalendarInitialState = {
    events: null,
    competitions: null,
    days: null,
    year: null,
    month: null,
    loading: false,
    error: null,
}

export const CalendarReducer = (state = InitialState, action: CalendarAction) => {
    switch (action.type) {
        case CalendarActionTypes.fetchCalendarCells: {
            return {
                ...state,
                events: action.payload,
                loading: false,
                error: null
            }
        }
        case CalendarActionTypes.fetchCalendarCompetitions: {
            return {
                ...state,
                competitions: action.payload,
                loading: false,
                error: null
            }
        }
        case CalendarActionTypes.fetchCalendarDays: {
            return {
                ...state,
                days: action.payload,
                loading: false,
            }
        }
        case CalendarActionTypes.fetchCalendarYear: {
            return {
                ...state,
                year: action.payload
            }
        }
        case CalendarActionTypes.fetchCalendarMonth: {
            return {
                ...state,
                month: action.payload
            }
        }
        case CalendarActionTypes.fetchCalendarLoading: {
            return {
                ...state,
                loading: action.payload
            }
        }
        case CalendarActionTypes.fetchCalendarError: {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }
        default:
            return state
    }
}