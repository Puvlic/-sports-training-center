import React, {useEffect, useState} from 'react';
import './loginAndRegisterWindow.scss'
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";
import {ILoginData, IRegisterData} from "../../types/loginAndRegisterWindowTypes";
import {ReactComponent as CloseIcon} from "../../icons/close_icon.svg";

enum ChangedRegisterInputs {
    'username' = 'USERNAME',
    'password' = 'PASSWORD',
    'email' = 'EMAIL',
    'repeat_password' = 'REPEAT-PASSWORD',
    'name_of_user' = 'NAME-OF-USER',
    'surname' = 'SURNAME',
    'patronymic' = 'PATRONYMIC',
    'gender' = 'GENDER',
    'date_of_birth' = 'DATE-OF-BIRTH',
    'phone_number' = 'PHONE-NUMBER',
}

const LoginAndRegisterWindow = () => {

    const {login, register, active, isLoginPage, loading} = useTypedSelector(state => state.login_and_register_window)
    const {user} = useTypedSelector(state => state.user)
    const {SetLoginAndRegisterWindowActive, SetLoginData, SetRegisterData, authorization, registration, SetIsLoginPageState, SetLoginAndRegisterWindowLoading} = useActions()
    const [registerValidation, setRegisterValidation] = useState('')
    const [loginValidation, setLoginValidation] = useState('')
    const window_opened_class = active ? 'open' : 'closed'

    useEffect(() => {
        console.log("<<Login window is opened>>")
    }, [])

    const ChangeWindow = (isLogin: boolean) => {
        SetIsLoginPageState(isLogin)
        setRegisterValidation("")
        setLoginValidation("")
    }

    const LoginValidation = async () => {
        const user_info = [login.username, login.password]
        const emptyInput = user_info.some(element => element === '' ? true : false)

        await SetLoginAndRegisterWindowLoading()
        if (emptyInput) {
            setLoginValidation("Не все поля были заполнены")
            return
        }

        try {
            await authorization(login.username, login.password)
            SetLoginData({username: '', password: '',})
            SetLoginAndRegisterWindowActive(false)
        } catch (e) {
            setLoginValidation("Введенные данные не верны")
        }

    }

    const LoginInfoChange = (event: React.ChangeEvent<HTMLInputElement>, isLogin: boolean) => {
        let login_info: ILoginData = {
            username: '',
            password: '',
        }
        if (isLogin) {
            login_info.username = event.target.value
            login_info.password = login['password']
        } else {
            login_info.username = login['username']
            login_info.password = event.target.value
        }
        SetLoginData(login_info)
    }

    const RegisterValidation = async () => {
        const register_info = Object.values(register);
        const emptyInput = register_info.some(element => element === '' ? true : false)

        await SetLoginAndRegisterWindowLoading()
        if (emptyInput) {
            setRegisterValidation("Не все поля были заполнены")
            SetRegisterData({
                username: register.username,
                password: '',
                repeat_password: '',
                email: register.email,
                name: register.name,
                surname: register.surname,
                patronymic: register.patronymic,
                gender: register.gender,
                date_of_birth: register.date_of_birth,
                phone_number: register.phone_number
            })
            return
        }
        if (register.password !== register.repeat_password) {
            setRegisterValidation("Повторный пароль не совпадает с первым")
            SetRegisterData({
                username: register.username,
                password: '',
                repeat_password: '',
                email: register.email,
                name: register.name,
                surname: register.surname,
                patronymic: register.patronymic,
                gender: register.gender,
                date_of_birth: register.date_of_birth,
                phone_number: register.phone_number
            })
            return
        }
        if (register.password.length < 4 || register.password.length >= 30) {
            setRegisterValidation("Пароль должен иметь длину более 4 и менее 30 символов")
            SetRegisterData({
                username: register.username,
                password: '',
                repeat_password: '',
                email: register.email,
                name: register.name,
                surname: register.surname,
                patronymic: register.patronymic,
                gender: register.gender,
                date_of_birth: register.date_of_birth,
                phone_number: register.phone_number
            })
            return
        }

        try {
            await registration(register)

            SetRegisterData({
                username: register.username,
                password: '',
                repeat_password: '',
                email: register.email,
                name: register.name,
                surname: register.surname,
                patronymic: register.patronymic,
                gender: register.gender,
                date_of_birth: register.date_of_birth,
                phone_number: register.phone_number
            })
            setLoginValidation("Регистрация прошла успешно")
            SetIsLoginPageState(true)
        } catch (e) {
            SetRegisterData({
                username: register.username,
                password: '',
                repeat_password: '',
                email: register.email,
                name: register.name,
                surname: register.surname,
                patronymic: register.patronymic,
                gender: register.gender,
                date_of_birth: register.date_of_birth,
                phone_number: register.phone_number
            })
            setRegisterValidation(String(e).replace('Error: ', ''))
        }

    }

    const RegisterInfoChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> , input: string) => {
        let register_info: IRegisterData = {
            username: register.username,
            email: register.email,
            password: register.password,
            repeat_password: register.repeat_password,
            name: register.name,
            surname: register.surname,
            patronymic: register.patronymic,
            gender: register.gender,
            date_of_birth: register.date_of_birth,
            phone_number: register.phone_number,
        }
        debugger
        switch (input) {
            case ChangedRegisterInputs['username']:
                register_info.username = event.target.value
                break
            case ChangedRegisterInputs['password']:
                register_info.password = event.target.value
                break
            case ChangedRegisterInputs['repeat_password']:
                register_info.repeat_password = event.target.value
                break
            case ChangedRegisterInputs['email']:
                register_info.email = event.target.value
                break
            case ChangedRegisterInputs['name_of_user']:
                register_info.name = event.target.value
                break
            case ChangedRegisterInputs['surname']:
                register_info.surname = event.target.value
                break
            case ChangedRegisterInputs['patronymic']:
                register_info.patronymic = event.target.value
                break
            case ChangedRegisterInputs['gender']:
                register_info.gender = event.target.value
                break
            case ChangedRegisterInputs['date_of_birth']:
                register_info.date_of_birth = event.target.value
                break
            case ChangedRegisterInputs['phone_number']:
                register_info.phone_number = event.target.value
                break
            default:
                break
        }
        SetRegisterData(register_info)
    }

    const CloseWindow = () => {
        let register_info: IRegisterData = {
            username: '',
            email: '',
            password: '',
            repeat_password: '',
            name: '',
            surname: '',
            patronymic: '',
            gender: '',
            date_of_birth: '',
            phone_number: '',
        }

        let login_info: ILoginData = {
            username: '',
            password: '',
        }
        SetRegisterData(register_info)
        SetLoginData(login_info)
        SetLoginAndRegisterWindowActive(false)
        SetIsLoginPageState(true)
    }

    const firstRegisterField = [
        {title: "Имя пользователя", input_type: "text", value: register.username, changed_input: ChangedRegisterInputs['username']},
        {title: "Пароль", input_type: "password", value: register.password, changed_input: ChangedRegisterInputs['password']},
        {title: "Повторите пароль", input_type: "password", value: register.repeat_password, changed_input: ChangedRegisterInputs['repeat_password']},
        {title: "Электронная почта", input_type: "text", value: register.email, changed_input: ChangedRegisterInputs['email']},
        {title: "Номер телефона", input_type: "text", value: register.phone_number, changed_input: ChangedRegisterInputs['phone_number']},
    ]

    const secondRegisterField = [
        {title: "Имя", input_type: "text", value: register.name, changed_input: ChangedRegisterInputs['name_of_user']},
        {title: "Фамилия", input_type: "text", value: register.surname, changed_input: ChangedRegisterInputs['surname']},
        {title: "Отчество", input_type: "text", value: register.patronymic, changed_input: ChangedRegisterInputs['patronymic']},
        {title: "Дата рождения", input_type: "date", value: register.date_of_birth, changed_input: ChangedRegisterInputs['date_of_birth']},
    ]

    if (loading) {
        return (
            <div className='preloader'></div>
        )
    }

    if (!isLoginPage) {
        return (
            <div className={`login-and-register-window-wrapper ${window_opened_class}`} onClick={CloseWindow}>
                <button className='login-and-register-window-close-button' onClick={CloseWindow}><CloseIcon/></button>
                <div className={`login-and-register-window-content register ${window_opened_class}`} onClick={e => e.stopPropagation()}>
                    <div className='login-and-register-window-header'>Регистрация</div>
                    <div className='first_register_field'>
                        <div>
                            {firstRegisterField.map((input, id) => (
                                <div key={id} className='login-and-register-window-input'>
                                    <div>{input.title}</div>
                                    <input type={input.input_type} value={input.value} onClick={() => setRegisterValidation("")} onChange={e => RegisterInfoChange(e, String(input.changed_input))}/>
                                </div>
                            ))}
                        </div>
                        <div>
                            {secondRegisterField.map((input, id) => (
                                    <div key={id} className='login-and-register-window-input'>
                                        <div>{input.title}</div>
                                        <input type={input.input_type} value={input.value} onClick={() => setRegisterValidation("")} onChange={e => RegisterInfoChange(e, String(input.changed_input))}/>
                                    </div>
                                ))}
                            <div className='login-and-register-window-select'>
                                <div>Пол</div>
                                <select name="gender_list" onChange={e => RegisterInfoChange(e, ChangedRegisterInputs['gender'])}>
                                    <option value="Мужской">Мужской</option>
                                    <option value="Женский">Женский</option>
                                </select>
                            </div>

                        </div>
                    </div>
                    {/*{registerInputParams.map((inputParams, id) => (*/}
                    {/*    <div key={id} className='login-and-register-window-input'>*/}
                    {/*        <div>{inputParams.title}</div>*/}
                    {/*        <input type={inputParams.input_type} value={inputParams.value} onClick={() => setRegisterValidation("")} onChange={e => RegisterInfoChange(e, String(inputParams.changed_input))}/>*/}
                    {/*    </div>*/}
                    {/*))}*/}
                    <div className='loginValidation'>{registerValidation}</div>
                    <div className='login-and-register-window-button-block'>
                        <button onClick={() => ChangeWindow(true)}>Авторизация</button>
                        <button onClick={RegisterValidation}>Регистрация</button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={`login-and-register-window-wrapper ${window_opened_class}`} onClick={CloseWindow}>
            <button className='login-and-register-window-close-button' onClick={CloseWindow}><CloseIcon/></button>
            <div className={`login-and-register-window-content ${window_opened_class}`} onClick={e => e.stopPropagation()}>
                <div className='login-and-register-window-header'>Авторизация</div>
                <div className='login-and-register-window-input'>
                    <div>Имя пользователя</div>
                    <input type="text" value={login['username']} onClick={() => setLoginValidation('')} onChange={e => LoginInfoChange(e, true)}/>
                </div>
                <div className='login-and-register-window-input'>
                    <div>Пароль</div>
                    <input type="password" value={login['password']} onClick={() => setLoginValidation('')} onChange={e => LoginInfoChange(e, false)}/>
                </div>
                <div className='loginValidation'>{loginValidation}</div>
                <div className='login-and-register-window-button-block'>
                    <button onClick={LoginValidation}>Авторизироваться</button>
                    <button onClick={() => ChangeWindow(false)}>Регистрация</button>
                </div>
            </div>
        </div>
    );
};

export default LoginAndRegisterWindow;