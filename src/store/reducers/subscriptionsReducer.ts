import {ISubscriptionsState, SubscriptionsAction, SubscriptionsActionTypes} from "../../types/subscriptionsTypes";


const InitialState: ISubscriptionsState = {
    subscriptions: [],
    loading: false,
    error: null,
}

export const SubscriptionsReducer = (state = InitialState, action: SubscriptionsAction) => {
    switch (action.type) {
        case SubscriptionsActionTypes.fetchSubscriptions: {
            return {
                ...state,
                subscriptions: action.payload,
                loading: false,
                error: null,
            }
        }
        case SubscriptionsActionTypes.fetchSubscriptionsLoading: {
            return {
                ...state,
                subscriptions: {...state.subscriptions},
                loading: true,
                error: null,
            }
        }
        case SubscriptionsActionTypes.fetchSubscriptionsError: {
            return {
                ...state,
                subscriptions: [],
                loading: false,
                error: action.payload
            }
        }
        default:
            return state
    }
}