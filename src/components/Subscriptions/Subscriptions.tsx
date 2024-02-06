import React, {useEffect} from 'react';
import {useActions} from "../../hooks/useActions";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import style from "./Subscriptions.module.scss"
import {ReactComponent as BigArmIcon} from "../../icons/big_arm_icon.svg";
import {ReactComponent as MediumArmIcon} from "../../icons/mediub_arm_icon.svg";
import {ReactComponent as SmallArmIcon} from "../../icons/small_arm_icon.svg";
import {NavLink} from "react-router-dom";
import {store} from "../../store";

const Subscriptions = () => {

    const {subscriptions, loading, error} = useTypedSelector(store => store.subscriptions)
    const {user} = useTypedSelector(store => store.user)
    const {FetchSubscriptions, SetLoginAndRegisterWindowActive} = useActions()

    let subscriptions_object;

    useEffect(() => {
        FetchSubscriptions()
    }, [])

    const UnloggedBuyClick = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault()
        SetLoginAndRegisterWindowActive(true)
    }

    subscriptions_object = [
        {
            id: subscriptions[0]?.id,
            name: subscriptions[0]?.name,
            action_time: subscriptions[0]?.action_time,
            price: subscriptions[0]?.price,
            svg_icon: <SmallArmIcon width='150px' height='150px'/>,
            text:
                "Абонемент для пуссечек-вардилочек. Можете даже не приходить, если вы собираетесь заниматься всего лишь месяц..."
        },

        {
            id: subscriptions[1]?.id,
            name: subscriptions[1]?.name,
            action_time: subscriptions[1]?.action_time,
            price: subscriptions[1]?.price,
            svg_icon: <MediumArmIcon width='150px' height='150px'/>,
            text:
                "Абонемент для ровных челиков. Welcome to the club, buddy."
        },

        {
            id: subscriptions[2]?.id,
            name: subscriptions[2]?.name,
            action_time: subscriptions[2]?.action_time,
            price: subscriptions[2]?.price,
            svg_icon: <BigArmIcon width='150px' height='150px'/>,
            text:
                "Почему машина не в гараже? А? Не слышу... Light weight, baby!"
        },
    ]


    if (loading) {
        return (
            <div className='preloader'></div>
        )
    }

    if (error) {
        return (
            <div></div>
        )
    }

    return (
        <div className={style.subscriptions_wrapper}>
            {subscriptions_object?.map(subscribe => (
                <div key={subscribe.id} className={style.subscribe_block}>
                    <div className={style.logo}>
                        {subscribe.svg_icon}
                    </div>

                    <div className={style.subscribe_main_info}>
                        <h2>{subscribe.name}</h2>
                        <div>Время действия: {subscribe.action_time} дней</div>
                        <div>Цена: {subscribe.price}</div>
                    </div>
                    <div className={style.subscribe_text}>
                        {subscribe.text} 
                        <NavLink to={`/subscriptions/buy/${subscribe.id}`} onClick={user === null ? e => UnloggedBuyClick(e) : undefined}><button>Купить</button></NavLink>
                    </div>
                    <div className={style.subscribe_side_info}>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Subscriptions;