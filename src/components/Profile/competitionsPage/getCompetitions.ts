import axios from "axios";
import {api_url} from "../../../api_url";
import {ICompetition} from "../../../types/calendarTypes";

export const getCompetitions = async (user_id: number) => {
    const userOnCompetitions = await axios.get(`${api_url}/get-user-on-competition/${user_id}`)
    let competitions: ICompetition[] = []

    console.log(userOnCompetitions.data)

    for (let i = 0; i < userOnCompetitions.data.length; i++) {
        const competition = await axios.get(`${api_url}/get-one-competition/${userOnCompetitions.data[i].competition_id}`)
        competitions.push(competition.data)
    }

    return competitions
}