import {
    ILoginAndRegisterWindowInitialState,
    LoginAndRegisterWindowActions,
    LoginAndRegisterWindowActionsType
} from "../../types/loginAndRegisterWindowTypes";

const InitialState: ILoginAndRegisterWindowInitialState = {
    loading: false,
    active: false,
    isLoginPage: true,
    register: {
        username: "",
        email: "",
        password: "",
        repeat_password: "",
        name: "",
        surname: "",
        patronymic: "",
        gender: "",
        date_of_birth: "",
        phone_number: "",
    },
    login: {
        username: "",
        password: "",
    }
}

export const LoginAndRegisterWindowReducer = (state = InitialState, action: LoginAndRegisterWindowActions) => {
    switch (action.type) {
        case LoginAndRegisterWindowActionsType.setWindowActive: {
            return {
                ...state,
                active: action.payload
            }
        }
        case LoginAndRegisterWindowActionsType.setRegisterData: {
            return {
                ...state,
                register: action.payload
            }
        }
        case LoginAndRegisterWindowActionsType.setLoginData: {
            return {
                ...state,
                login: action.payload
            }
        }
        case LoginAndRegisterWindowActionsType.setWindowLoadingActive: {
            return {
                ...state,
                loading: action.payload
            }
        }
        case LoginAndRegisterWindowActionsType.setIsLoginPageState: {
            return {
                ...state,
                isLoginPage: action.payload,
                loading: false
            }
        }
        default:
            return state
    }
}