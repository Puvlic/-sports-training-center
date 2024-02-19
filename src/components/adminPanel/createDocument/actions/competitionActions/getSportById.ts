import axios from "axios";
import {api_url} from "../../../../../api_url";

export const getSportById = async (id: number) => {
    let sport = await axios.get(`${api_url}/sport/get_one/${id}`)
    return sport.data
}