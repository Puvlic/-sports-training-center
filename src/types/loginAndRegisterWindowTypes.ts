export enum LoginAndRegisterWindowActionsType {
    setWindowActive = "SET-LOGIN-AND-REGISTER-WINDOW-ACTIVE",
    setRegisterData = "SET-REGISTER-DATA",
    setLoginData = "SET-LOGIN-DATA",
    setWindowLoadingActive = "SET-LOGIN-AND-REGISTER-WINDOW-LOADING",
    setIsLoginPageState = "SET-IS-LOGIN-PAGE-STATE",
}

interface SetLoginAndRegisterWindowActive {
    type: LoginAndRegisterWindowActionsType.setWindowActive,
    payload: boolean
}

interface SetRegisterData {
    type: LoginAndRegisterWindowActionsType.setRegisterData,
    payload: IRegisterData
}

interface SetLoginAData {
    type: LoginAndRegisterWindowActionsType.setLoginData,
    payload: ILoginData
}

interface SetWindowLoadingActive {
    type: LoginAndRegisterWindowActionsType.setWindowLoadingActive,
    payload: boolean
}

interface IsLoginPageState {
    type: LoginAndRegisterWindowActionsType.setIsLoginPageState,
    payload: boolean
}

export type LoginAndRegisterWindowActions = SetLoginAndRegisterWindowActive | SetRegisterData | SetLoginAData | SetWindowLoadingActive | IsLoginPageState

export interface IRegisterData {
    username: string,
    email: string,
    password: string,
    repeat_password: string,
    name: string,
    surname: string,
    patronymic: string,
    gender: string,
    date_of_birth: string,
    phone_number: string,
}

export interface ILoginData {
    username: string,
    password: string,
}

export interface ILoginAndRegisterWindowInitialState {
    loading: boolean,
    active: boolean,
    isLoginPage: boolean,
    register: IRegisterData,
    login: ILoginData,
}