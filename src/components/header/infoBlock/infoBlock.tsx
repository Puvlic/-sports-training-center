import React from 'react';
import './infoBlock.scss'
import logo from '../../../icons/logo.png'
import {ReactComponent as PhoneLogo} from "../../../icons/call_icon.svg";
import {ReactComponent as LocationLogo} from "../../../icons/location_icon.svg";
import {NavLink} from "react-router-dom";

const InfoBlock = () => {
    return (
        <div className="wrapper">
            <NavLink to='/'>
                <img src={logo} alt=""/>
            </NavLink>
            <div className="information">
                <div>
                    <PhoneLogo width="30" height="30"/>
                    <div>Телефон: (8962) 47-45-71</div>
                </div>
                <div>
                    <LocationLogo width="30" height="30"/>
                    <div>г.Пенза, ул.Антонова, 39а</div>
                </div>
            </div>
        </div>
    );
};

export default InfoBlock;