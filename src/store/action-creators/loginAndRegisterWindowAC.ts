import {Dispatch} from "react";
import {
    ILoginData,
    IRegisterData,
    LoginAndRegisterWindowActions,
    LoginAndRegisterWindowActionsType
} from "../../types/loginAndRegisterWindowTypes";

export const SetLoginAndRegisterWindowActive = (active: boolean) => {
    return (dispatch: Dispatch<LoginAndRegisterWindowActions>) => {
        dispatch({type: LoginAndRegisterWindowActionsType.setWindowActive, payload: active})
    }
}

export const SetLoginData = (loginInfo: ILoginData) => {
    return (dispatch: Dispatch<LoginAndRegisterWindowActions>) => {
        dispatch({type: LoginAndRegisterWindowActionsType.setLoginData, payload: loginInfo})
    }
}

export const SetRegisterData = (registerInfo: IRegisterData) => {
    return (dispatch: Dispatch<LoginAndRegisterWindowActions>) => {
        dispatch({type: LoginAndRegisterWindowActionsType.setRegisterData, payload: registerInfo})
    }
}

export const SetLoginAndRegisterWindowLoading = () => {
    return (dispatch: Dispatch<LoginAndRegisterWindowActions>) => {
        debugger
        dispatch({type: LoginAndRegisterWindowActionsType.setWindowLoadingActive, payload: true})
        setTimeout(() => {
            dispatch({type: LoginAndRegisterWindowActionsType.setWindowLoadingActive, payload: false})
        }, 1500)

    }
}

export const SetIsLoginPageState = (is_login_page: boolean) => {
    return (dispatch: Dispatch<LoginAndRegisterWindowActions>) => {
        dispatch({type: LoginAndRegisterWindowActionsType.setIsLoginPageState, payload: is_login_page})
    }
}
