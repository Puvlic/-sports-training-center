import {ITrainingsState, TrainingsActions, TrainingsActionTypes} from "../../types/trainingsTypes";

const TrainingsState: ITrainingsState = {
    trainings: [],
    loading: false,
    error: null
}

export const TrainingsReducer = (state = TrainingsState, action: TrainingsActions) => {
    switch (action.type) {
        case TrainingsActionTypes.fetchTrainings: {
            return {
                ...state,
                trainings: action.payload,
                loading: false,
                error: null
            }
        }
        case TrainingsActionTypes.fetchTrainingsLoading: {
            return {
                ...state,
                loading: true,
                error: null
            }
        }
        case TrainingsActionTypes.fetchTrainingsError: {
            return {
                ...state,
                trainings: [],
                loading: false,
                error: action.payload
            }
        }
        default:
            return state
    }
}