import React from 'react';
import {IUser} from "../../../types/userTypes";
import style from "../competitionsAP/competitionsAP.module.scss";
import {NavLink} from "react-router-dom";
import {generateDocument} from "../createDocument/createDocument";
import {documentTypes} from "../createDocument/documentTemplates/documentTypes";

interface IUserAP {
    users: IUser[] | null
}

const months = ['Янаврья', 'Февраля', 'Марта', 'Апреля', 'Майя', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря']
const UsersAP: React.FC<IUserAP> = (props) => {

    return (
        <>
            {props.users?.map((user, index) => (
                <div className={style.training_block} key={index}>
                    <div>

                        <p className={style.sport_name}>{user.surname} {user.name} {user.patronymic}</p>
                        <p>id: {user.id}</p>
                        <p>Пол: {user.gender}</p>
                        <p>Дата рождения: {user.date_of_birth.split('-')[0]} {months[Number(user.date_of_birth.split('-')[1])]} {user.date_of_birth.split('-')[2]} года</p>
                        <p>Номер телефона: +7 ({user.phone_number.slice(1, 4)}) {user.phone_number.slice(4, 7)} {user.phone_number.slice(7,9)}-{user.phone_number.slice(9,11)}</p>
                    </div>
                    <div className={style.button_block}>
                        <NavLink to='/profile/admin_panel/copetition/:id/users'>
                            <button className={style.button}>
                                Список участников
                            </button>
                        </NavLink>
                        <button className={style.button} onClick={() => generateDocument(documentTypes.user, user.id)}>
                            Создать отчет
                        </button>
                    </div>
                </div>
            ))}
        </>
    );
};

export default UsersAP;