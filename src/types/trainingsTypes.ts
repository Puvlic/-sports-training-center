export enum TrainingsActionTypes {
    fetchTrainings= "FETCH-TRAININGS",
    fetchTrainingsLoading = "FETCH-TRAININGS-LOADING",
    fetchTrainingsError = "FETCH-TRAININGS-ERROR",
}

interface fetchTrainings {
    payload: ITraining[],
    type: TrainingsActionTypes.fetchTrainings
}

interface fetchTrainingsLoading {
    type: TrainingsActionTypes.fetchTrainingsLoading
}

interface fetchTrainingsError {
    payload: string,
    type: TrainingsActionTypes.fetchTrainingsError
}

export type TrainingsActions = fetchTrainings | fetchTrainingsLoading | fetchTrainingsError

export interface ITraining {
    id: number,
    start_time: string,
    end_time: string,
    trainer: string,
    sport: string,
    gym: string,
}

export interface ITrainingsState {
    trainings: ITraining[],
    loading: boolean,
    error: string | null
}