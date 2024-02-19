import axios from "axios";
import {api_url} from "../../../../../api_url";

export const getCompetitionById = async (id: number) => {
    let competition = await axios.get(`${api_url}/get-one-competition/${id}`)
    return competition.data
}