import axios from "axios";
import {api_url} from "../../../api_url";

export const GetCompetitionAsync = async (competition_id: number) => {
    try {
        const competition = await axios.get(`${api_url}/get-one-competition/${competition_id}`)
        return competition.data
    } catch (e) {

    }
}

export const GetUserOnCompetitionAsync = async (user_id: number) => {
    try {
        const info = await axios.get(`${api_url}/get-user-on-competition/${user_id}`)
        return info.data
    } catch (e) {

    }
}

export const RemoveUserOnCamp = async (user_id: number, competition_id: number) => {
    try {
        await axios.delete(`${api_url}/remove-user-on-competition`, {
            data: {
                user_id: user_id,
                competition_id: competition_id
            }
        })
    } catch (e) {

    }
}

export const addUserOnCamp = async (user_id: number, competition_id: number) => {
    try {
        await axios.post(`${api_url}/add-user-on-competition`, {
            user_id: user_id,
            competition_id: competition_id
        })
    } catch (e) {

    }
}

export const getSportName = async (sport_id: number) => {
    console.log(sport_id)
    try {
        const sport_name = await axios.get(`${api_url}/sport/get_one/${sport_id}`)
        return sport_name.data.sport
    } catch (e) {

    }
}