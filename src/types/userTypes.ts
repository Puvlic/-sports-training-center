export enum userActions {
    fetchUser = "FETCH-USER",
    fetchUserError = "FETCH-USER-ERROR",
    fetchUserLoading = "FETCH-USER-LOADING"
}

export interface IUser {
    id: number,
    name: string,
    surname: string,
    patronymic: string,
    gender: string,
    date_of_birth: string,
    role: number,
    phone_number: string,
    username: string,
}

export type user = IUser | null

interface IFetchUser {
    type: userActions.fetchUser,
    payload: user
}

interface IFetchUserError {
    type: userActions.fetchUserError,
    payload: string | null
}

interface IFetchUserLoading {
    type: userActions.fetchUserLoading,
    payload: boolean
}

export type userReducerType = IFetchUser | IFetchUserError | IFetchUserLoading

export interface IUserReducer {
    user: user,
    loading: boolean,
    error: string | null
}