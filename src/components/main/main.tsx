import React from 'react';
import trainer from '../../images/trainer.jpeg'
import style from './main.module.scss'
import {NavLink} from "react-router-dom";

const Main = () => {
    return (
        <div className={style.sport_block_wrapper}>
            <div className={style.sport_block_info_section}>
                <div className={style.text_block}>
                    Шо ты, тюбик? Пришел тренироваться в наш Центр Спортивной Подготовки? Ну давай, заходи тогда. Сейчас мы из тебя все соки выжмем блин ё маё! Через пару месяцев уже будешь флексить своими мышцами!
                </div>
                <NavLink to='trainings' className={style.sport_block_bottom_button}>
                    Посмотреть тренировки
                </NavLink>

            </div>

            <img className={style.img_styling} src={trainer} alt=""/>
        </div>
    );
};

export default Main;