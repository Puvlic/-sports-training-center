import React, {useEffect, useState} from 'react';
import style from './buySubscription.module.scss'
import {CreateUserSubscription} from "./createUserSubscription";
import {GetSubscription} from "./getSubscription";
import {ISubscription} from "../../../types/subscriptionsTypes";
import {NavLink} from "react-router-dom";
import Cookies from "universal-cookie";



const BuySubscription = () => {

    const subscription_id = Number(window.location.href.split('/').pop())
    const [subscription, setSubscription] = useState<ISubscription>()
    const [cardNumber, setCardNumber] = useState<string>("")

    const cookies = new Cookies()
    const jwt = cookies.get("jwt")
    const user_id = Number(JSON.parse(atob(jwt.split('.')[1])).id)

    useEffect(() => {
        let receivedSubscription: any
        const getSubscription = async () => {
            receivedSubscription = await GetSubscription(subscription_id)
            setSubscription(receivedSubscription)
        }
        getSubscription().then()
    }, [])

    const changeCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length > 16) {
            return
        } else {
            setCardNumber(e.target.value)
        }
    }

    const CreateSubscription = (event: React.MouseEvent<HTMLElement>) => {
        if (cardNumber.length !== 16) {
            event.preventDefault()
            return
        }
        CreateUserSubscription(user_id, subscription_id)
    }

    return (
        <div className={style.subscription_wrapper}>
            <div className={style.subscription_info_block}>
                <p className={style.subscription_name}>{subscription?.name}</p>
                <p>Цена: {subscription?.price} р.</p>
                <p>Длительность: {subscription?.action_time} дней</p>
            </div>
            <div className={style.requisites_block}>
                <p>Номер карты</p>
                <input type="number" value={cardNumber} onChange={e => changeCardNumber(e)}/>
                <NavLink to="/subscriptions" onClick={e => CreateSubscription(e)}>
                    <button>Оформить подписку</button>
                </NavLink>

            </div>
        </div>
    );
};

export default BuySubscription;