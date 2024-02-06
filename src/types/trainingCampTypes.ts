export enum TrainingCampActionTypes {
    fetchTrainingCampMembers = "FETCH-TRAINING-CAMP-MEMBERS",
    fetchTrainingCampError = "FETCH-TRAINING-CAMP-ERROR"
}

interface fetchTrainingCampError {
    type: TrainingCampActionTypes.fetchTrainingCampError,
    payload: string
}

interface fetchTrainingCampMembers {
    type: TrainingCampActionTypes.fetchTrainingCampMembers,
    payload: ITrainingCampMember[],
}

export type TrainingCampAction = fetchTrainingCampMembers | fetchTrainingCampError

export interface ITrainingCampMember {
    training_camp_id: number,
    user_id: number,
    post: string,
}

export interface ITrainingCampState {
    trainingCampMembers: ITrainingCampMember[] | null,
    error: string | null,
}