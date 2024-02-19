import React, {useEffect, useState} from 'react';
import {ICompetition} from "../../../types/calendarTypes";
import style from "./competitionsAP.module.scss";
import {NavLink} from "react-router-dom";
import {getSportName} from "../../events/competition/getCompetition";
import {generateDocument} from "../createDocument/createDocument"
import {documentTypes} from '../createDocument/documentTemplates/documentTypes'

interface ICompetitionAP {
    competitions: ICompetition[] | null
}

const months = ['Янаваря', 'Февраля', 'Марта', 'Апреля', 'Майя', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря']

const CompetitionsAP: React.FC<ICompetitionAP> = (props) => {

    const [competitionSports, setCompetitionSports] = useState<string[]>([])

    useEffect(() => {
        const getSport = async (sport_id: number) => {
            const sport = await getSportName(sport_id)
            return sport
        }

        if (props.competitions !== undefined && props.competitions !== null) {
            for (let i = 0; i < props.competitions!.length; i++) {
                getSport(props.competitions[i].sport_id).then(res => {
                    let competitionSportsCopy = Object.assign([], competitionSports);
                    competitionSportsCopy.push(res)
                    setCompetitionSports(competitionSportsCopy)
                })
            }
        }
    }, []);

    return (
        <>
            {props.competitions?.map((competition, index) => (
                <div className={style.training_block} key={index}>
                    <div>
                        <p className={style.sport_name}>{competition.name}</p>
                        <p>Дата начала: {competition.start_date} {months[competition.month]}</p>
                        <p>Вид спорта: {competitionSports[0]}</p>
                        <p>Продолжительность: {competition.duration} дней</p>
                        <p>Место проведения: {competition.location}</p>
                    </div>
                    <div className={style.button_block}>
                        <NavLink to='/profile/admin_panel/copetition/:id/users'>
                            <button className={style.button}>
                                Список участников
                            </button>
                        </NavLink>
                        <button className={style.button} onClick={() => generateDocument(documentTypes.competition, competition.id)}>
                            Создать отчет
                        </button>
                    </div>
                </div>
            ))}
        </>
    );
};

export default CompetitionsAP;