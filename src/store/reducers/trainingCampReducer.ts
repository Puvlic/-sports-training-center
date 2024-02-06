import {ITrainingCampState, TrainingCampAction, TrainingCampActionTypes} from "../../types/trainingCampTypes";

const InitialState: ITrainingCampState = {
    trainingCampMembers: null,
    error: null,
}

export const TrainingCampReducer = (state = InitialState, action: TrainingCampAction) => {
    switch (action.type) {
        case TrainingCampActionTypes.fetchTrainingCampMembers: {
            return {
                ...state,
                trainingCampMembers: action.payload
            }
        }
        case TrainingCampActionTypes.fetchTrainingCampError: {
            return {
                ...state,
                error: action.payload
            }
        }
        default:
            return state
    }
}