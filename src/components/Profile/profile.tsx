import React, {useEffect} from 'react';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import style from "./profile.module.scss"
import {NavLink} from "react-router-dom";
import {useActions} from "../../hooks/useActions";
import {Simulate} from "react-dom/test-utils";
import load = Simulate.load;

const months = ['Янавря', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря']

const Profile = () => {

    const {user, loading} = useTypedSelector(state => state.user)
    console.log(user)

    useEffect(() => {

    }, []);

    if (loading) {
        return (
            <div className='preloader'></div>
        )
    }

    if (user == null) {
        return (
            <h1>
                Вход в систему не был совершен
            </h1>
        )
    }

    const dateOfBirthSplitedArray = user.date_of_birth.split('-')

    const dateOfBirth = {
        day: dateOfBirthSplitedArray[2],
        month: months[Number(dateOfBirthSplitedArray[1][1])],
        year: dateOfBirthSplitedArray[0]
    }

    return (
        <div className={style.profile_wrapper}>
            <div className={style.user_info}>
                <p className={style.user_name}>{user.surname} {user.name} {user.patronymic}</p>
                <p>Дата рождения: {dateOfBirth.day} {dateOfBirth.month} {dateOfBirth.year} г.</p>
                <p>Пол: {user.gender}</p>
                <p>Номер: {user.phone_number[0]} {user.phone_number.slice(1, 4)} {user.phone_number.slice(4, 7)}-{user.phone_number.slice(7, 9)}-{user.phone_number.slice(9, 11)}</p>
            </div>
            <div className={style.buttons_wrapper}>
                <NavLink to={'/profile/change_info'}>
                    <button >
                        Изменить данные
                    </button>
                </NavLink>
                <NavLink to={'/profile/training_camps'}>
                    <button>
                        Сборы
                    </button>
                </NavLink>
                <NavLink to={'/profile/trainings'}>
                    <button>
                        Тренировки
                    </button>
                </NavLink>
                <NavLink to={'/profile/competitions'}>
                    <button>
                        Соревнования
                    </button>
                </NavLink>
            </div>
            {user.role === 2 ? (
                <NavLink to={'/profile/admin_panel'}>
                    <button className={style.admin_panel_button}>
                        Админ панель
                    </button>
                </NavLink>
            ) : (<></>)}
        </div>
    );
};

export default Profile;