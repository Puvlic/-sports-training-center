import React, {useEffect, useState} from 'react';
import style from './changeUserInfo.module.scss'
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {IUser} from "../../../types/userTypes";
import {useActions} from "../../../hooks/useActions";
import Cookies from "universal-cookie";
import {NavLink} from "react-router-dom";
import {INewUserInfo, UpdateUser} from "./updateUserFunction"

const ChangeUserInfo = () => {

    const {getUserById} = useActions()

    const cookies = new Cookies()
    const jwt = cookies.get("jwt")

    const {updateUser} = useActions()
    const {user} = useTypedSelector(state => state.user)

    const [userInfo, setUserInfo] = useState({
        name: user?.name,
        surname: user!?.surname,
        patronymic: user!?.patronymic,
        gender: user!?.gender,
        date_of_birth: user!?.date_of_birth,
        number: user!?.phone_number,
    })

    const [validationText, setValidationText] = useState("")

    useEffect(() => {
        getUserById(Number(JSON.parse(atob(jwt.split('.')[1])).id))
    }, [jwt])

    useEffect(() => {
        setUserInfo({
            name: user?.name,
            surname: user!?.surname,
            patronymic: user!?.patronymic,
            gender: user!?.gender,
            date_of_birth: user!?.date_of_birth,
            number: user!?.phone_number,
        })
    }, [user])

    const onChangeHandler = (infoType: string, event: React.ChangeEvent<HTMLInputElement>) => {
        setUserInfo(prevState => ({
            ...prevState,
            [infoType]: event.target.value
        }))
    }

    let inputs = [
        {title: "Имя", inputType: "text", value: userInfo.name, infoType: "name"},
        {title: "Фамилия", inputType: "text", value: userInfo.surname, infoType: "surname"},
        {title: "Отчество", inputType: "text", value: userInfo.patronymic, infoType: "patronymic"},
        {title: "Пол", inputType: "text", value: userInfo.gender, infoType: "gender"},
        {title: "Дата рождения", inputType: "date", value: userInfo.date_of_birth, infoType: "date_of_birth"},
        {title: "Номер телефона", inputType: "number", value: userInfo.number, infoType: "number"},
    ]

    const changeUserInfo = (event: React.MouseEvent<HTMLElement>) => {
        const userInfoArray = Object.values(userInfo)
        userInfoArray.some(element => {
            if (element == "") {
                event.preventDefault()
                setValidationText("Не все поля были заполнены")
            }
        })
        if (userInfo.number?.length !== 11) {
            event.preventDefault()
            setValidationText("Номер телефона введен некорректно")
        }

        const newUserInfo: INewUserInfo = {
            id: user?.id!,
            name: userInfo.name!,
            surname: userInfo.surname,
            patronymic: userInfo.patronymic,
            gender: userInfo.gender,
            date_of_birth: userInfo.date_of_birth,
            number: userInfo.number,
        }

        UpdateUser(newUserInfo).then(() => {
            getUserById(Number(JSON.parse(atob(jwt.split('.')[1])).id))
        })

    }

    if (user == null) {
        return (
            <h1>
                Вход в систему не был совершен
            </h1>
        )
    }

    return (
        <div className={style.change_info_wrapper}>
            {inputs.map(input => (
                <div key={input.infoType}>
                    <p>{input.title}</p>
                    <input type={input.inputType} value={input.value}
                           onChange={e => onChangeHandler(input.infoType, e)}
                           onClick={() => setValidationText("")}/>
                </div>
            ))}

            <div className={style.validation}>{validationText}</div>

            <div className={style.button_block}>
                <NavLink to="/profile" onClick={e => changeUserInfo(e)}>
                    <button>
                        Изменить
                    </button>
                </NavLink>
                <NavLink to="/profile">
                    <button>
                        Отмена
                    </button>
                </NavLink>
            </div>
        </div>
    );
};

export default ChangeUserInfo;