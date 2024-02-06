import {Dispatch} from "react";
import {SubscriptionsAction, SubscriptionsActionTypes} from "../../types/subscriptionsTypes";
import axios from "axios";
import {api_url} from "../../api_url";

export const FetchSubscriptions = () => {
    return async (dispatch: Dispatch<SubscriptionsAction>) => {
        try {
            dispatch({type: SubscriptionsActionTypes.fetchSubscriptionsLoading, payload: true})
            const res = await axios.get(`${api_url}/get-all-subscriptions`)
            setTimeout(() => {
                dispatch({type: SubscriptionsActionTypes.fetchSubscriptions, payload: res.data})

            }, 2000)
            // dispatch({type: SubscriptionsActionTypes.fetchSubscriptionsLoading, payload: false})
        } catch (e) {
            dispatch({type: SubscriptionsActionTypes.fetchSubscriptionsError, payload: "Ошибка подключения к серверу"})
        }
    }
}