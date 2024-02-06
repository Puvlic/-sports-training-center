import {Dispatch} from "react";
import {userActions, userReducerType} from "../../types/userTypes";
import axios from "axios";
import {api_url} from "../../api_url";
import Cookies from "universal-cookie";
import {IRegisterData} from "../../types/loginAndRegisterWindowTypes";

const cookies = new Cookies()

export interface INewUserInfo {
    id: number,
    name: string,
    surname: string,
    patronymic: string,
    gender: string,
    date_of_birth: string,
    number: string,
}

export const authorization = (username: string, password: string) => {
    return async (dispatch: Dispatch<userReducerType>) => {
        let user_id
        try {
            await axios.post(`${api_url}/login`, {
                username: username,
                password: password
            }).then(async res => {
                cookies.set("jwt", res.data, {path: '/'})
                user_id = JSON.parse(atob(res.data.split('.')[1]));
                const user = await axios(`${api_url}/get-user/${user_id.id}`)
                dispatch({type: userActions.fetchUser, payload: user.data})
            })
        } catch (e) {
            throw e
        }
    }
}

export const logout = () => {
    return async (dispatch: Dispatch<userReducerType>) => {
        dispatch({type: userActions.fetchUserLoading, payload: true})
        setTimeout(() => {
            dispatch({type: userActions.fetchUser, payload: null})
        }, 500)
        dispatch({type: userActions.fetchUserLoading, payload: false})
        cookies.remove("jwt", {path: '/'})
    }
}

export const getUserById = (id: number) => {
    return async (dispatch: Dispatch<userReducerType>) => {
        try {
            await axios.get(`${api_url}/get-user/${id}`).then(res => {
                dispatch({type: userActions.fetchUser, payload: res.data})
            })
        } catch (e) {
        }

    }
}

export const registration = (user_info: IRegisterData) => {
    return async (dispatch: Dispatch<userReducerType>) => {
        try {
            await axios.post(`${api_url}/registration`, {
                name: user_info.name,
                surname: user_info.surname,
                patronymic: user_info.patronymic,
                gender: user_info.gender,
                date_of_birth: user_info.date_of_birth,
                username: user_info.username,
                password: user_info.password,
                phone_number: user_info.phone_number,
            }).catch(function (error) {
                if (error.response) {
                    throw new Error(error.response.data.message)
                }
            })
        } catch (e) {
            throw e
        }
    }
}

export const updateUser = (newUserInfo: INewUserInfo) => {
    return async (dispatch: Dispatch<userReducerType>) => {
        await axios.put(`${api_url}/user/update`, {
            id: newUserInfo.id,
            name: newUserInfo.name,
            surname: newUserInfo.surname,
            patronymic: newUserInfo.patronymic,
            gender: newUserInfo.gender,
            date_of_birth: newUserInfo.date_of_birth,
            phone_number: newUserInfo.number
        }).then()
    }
}
