export enum CalendarActionTypes {
    fetchCalendarCells = "FETCH-CALENDAR-CELLS",
    fetchCalendarCompetitions = "FETCH-CALENDAR-COMPETITIONS",
    fetchCalendarDays = 'FETCH-CALENDAR-DAYS',
    fetchCalendarYear = "FETCH-CALENDAR-YEAR",
    fetchCalendarMonth = "FETCH-CALENDAR-MONTH",
    fetchCalendarLoading = "FETCH-CALENDAR-LOADING",
    fetchCalendarError = "FETCH-CALENDAR-ERROR",
}

interface fetchCalendarCells {
    type: CalendarActionTypes.fetchCalendarCells,
    payload: IEvent[]
}

interface fetchCalendarCompetitions {
    type: CalendarActionTypes.fetchCalendarCompetitions,
    payload: ICompetition[]
}

interface fetchCalendarDays {
    type: CalendarActionTypes.fetchCalendarDays,
    payload: (Date | undefined)[][]
}

interface fetchCalendarYear {
    type: CalendarActionTypes.fetchCalendarYear,
    payload: number
}

interface fetchCalendarMonth {
    type: CalendarActionTypes.fetchCalendarMonth,
    payload: number
}

interface fetchCalendarLoading {
    type: CalendarActionTypes.fetchCalendarLoading,
    payload: boolean
}

interface fetchCalendarError {
    type: CalendarActionTypes.fetchCalendarError,
    payload: string
}

export type CalendarAction = fetchCalendarCells | fetchCalendarCompetitions | fetchCalendarDays | fetchCalendarYear | fetchCalendarMonth | fetchCalendarLoading | fetchCalendarError

export interface IEvent {
    id: number,
    type: string,
    sport_id: number
    start_date: string,
    duration: string,
    year: number,
    month: number,
    location: string,
    name: string,
}

export interface ICompetition {
    id: number,
    type: string,
    sport_id: number,
    name: string,
    duration: string,
    start_date: string,
    year: number,
    month: number,
    location: string,
    organizer: string,
}

export interface ICalendarInitialState {
    events: IEvent[] | null,
    competitions: ICompetition[] | null,
    days: (Date | undefined)[][] | null,
    year: number | null,
    month: number | null,
    loading: boolean,
    error: string | null
}