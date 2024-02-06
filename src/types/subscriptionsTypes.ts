export enum SubscriptionsActionTypes {
    fetchSubscriptions = "FETCH-SUBSCRIPTIONS",
    fetchSubscriptionsLoading = "FETCH-SUBSCRIPTIONS-LOADING",
    fetchSubscriptionsError = "FETCH-SUBSCRIPTIONS-ERROR",
}

interface fetchSubscriptions {
    type: SubscriptionsActionTypes.fetchSubscriptions,
    payload: ISubscription[]
}

interface fetchSubscriptionsLoading {
    type: SubscriptionsActionTypes.fetchSubscriptionsLoading,
    payload: boolean
}

interface fetchSubscriptionsError {
    type: SubscriptionsActionTypes.fetchSubscriptionsError,
    payload: string | null
}

export type SubscriptionsAction = fetchSubscriptions | fetchSubscriptionsLoading | fetchSubscriptionsError

export interface ISubscription {
    id: number,
    name: string,
    action_time: number,
    price: number,
}

export interface ISubscriptionsState {
    subscriptions: ISubscription[],
    loading: boolean,
    error: string | null
}