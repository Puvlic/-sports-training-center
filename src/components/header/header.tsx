import React, {useEffect, useState} from 'react';
import './header.scss'
import {ReactComponent as AboutUsIcon} from "../../icons/information_icon.svg";
import {ReactComponent as TrainingIcon} from "../../icons/football_icon.svg";
import {ReactComponent as EventIcon} from "../../icons/calendar_number_icon.svg";
import {ReactComponent as ProfileIcon} from "../../icons/person_icon.svg";
import {ReactComponent as SubscriptionIcon} from "../../icons/subscription_icon.svg";
import {ReactComponent as NewsIcon} from "../../icons/news_icon.svg";
import {ReactComponent as MedalIcon} from "../../icons/medal.svg";
import InfoBlock from "./infoBlock/infoBlock";
import {useActions} from "../../hooks/useActions";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import Cookies from "universal-cookie";
import {getUserById} from "../../store/action-creators/userAC";
import {NavLink} from "react-router-dom";

const Header = () => {

    const cookies = new Cookies()
    const {SetLoginAndRegisterWindowActive, logout} = useActions()
    const {user, loading} = useTypedSelector(state => state.user)
    const {getUserById} = useActions()
    const [enterInsetClass, setEnterInsetClass] = useState<string>("enter_inset")
    const [profileText, setProfileText] = useState<string>("")
    const loading_active = loading ? 'open_logout_preloader' : 'closed_logout_preloader'
    const jwt = cookies.get("jwt")

    const profileText1 = cookies.get("jwt") === undefined ? 'Вход' : `${user?.surname} ${user?.name[0]}.`

    useEffect(() => {
        if (jwt !== undefined) {
            getUserById(Number(JSON.parse(atob(jwt.split('.')[1])).id))
            setEnterInsetClass("profile_inset")
        } else {
            setEnterInsetClass("enter_inset")
        }
    }, [jwt])

    const OpenLoginWindow = () => {
        if (user == null) {
            SetLoginAndRegisterWindowActive(true)
        }
    }

    return (
        <header className={'header'}>
            <InfoBlock/>
            <ul>
                {/*<li className='header-insets'>*/}
                {/*    <NavLink to='/about_us' className='link'><AboutUsIcon className="icon" width="25" height="25"/>О нас</NavLink>*/}
                {/*</li>*/}
                <li>
                    <NavLink to='/news' className='link'><NewsIcon className="icon" width="30" height="30"/>Новости</NavLink>
                </li>
                <li>
                    <NavLink to='/subscriptions' className='link'><SubscriptionIcon className="icon" width="20" height="20"/>Абонемент</NavLink>
                </li>
                <li>
                    <NavLink to='/trainings' className='link'><TrainingIcon className="icon" width="25" height="25"/>Тренировки</NavLink>
                </li>
                <li>
                    <NavLink to='/events' className='link'><EventIcon className="icon" width="25" height="25"/>Мероприятия</NavLink>
                </li>
                {/*<li>*/}
                {/*    <NavLink to='/competitions' className='link'><MedalIcon className="icon" width="30" height="30"/>Соревнования</NavLink>*/}
                {/*</li>*/}
                <li className={enterInsetClass} onClick={OpenLoginWindow}>
                        <NavLink to={window.location.href} onClick={e => e.preventDefault()} className='link'><ProfileIcon className="icon" width="25" height="25"/>{profileText1}</NavLink>
                    <ul className='semi_menu' onClick={e => e.stopPropagation()}>
                        <li><NavLink to={`/profile`}>Профиль</NavLink></li>
                        <li onClick={logout}>Выход</li>
                    </ul>
                </li>
            </ul>
            <div className={`logout_preloader ${loading_active}`}></div>
        </header>
    );
};

export default Header;