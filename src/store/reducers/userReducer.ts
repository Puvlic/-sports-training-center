import {IUserReducer, userActions, userReducerType} from "../../types/userTypes";

const initialState: IUserReducer = {
    user: null,
    loading: false,
    error: null
}

export const userReducer = (state = initialState, action: userReducerType) => {
    switch (action.type) {
        case (userActions.fetchUser): {
            return {
                ...state,
                user: action.payload,
                loading: false,
                error: null
            }
        } case (userActions.fetchUserError): {
            return {
                ...state,
                error: action.payload,
                loading: false,
            }
        } case (userActions.fetchUserLoading): {
            return {
                ...state,
                error: null,
                loading: true
            }
        } default:
            return state
    }
}