import axios from "axios";
import {api_url} from "../../../../../api_url";

export const getTrainingById = async (id: number) => {
    let training = await axios.get(`${api_url}/get-one-training/${id}`)
    return training.data
}

export const getUserById = async (id: number) => {
    let user = await axios.get(`${api_url}/get-user/${id}`)
    return user.data
}

export const getSportById = async (id: number) => {
    let sport = await axios.get(`${api_url}/sport/get_one/${id}`)
    return sport.data
}

export const getGymById = async (id: number) => {
    let gym = await axios.get(`${api_url}/gym/get_one/${id}`)
    return gym.data
}