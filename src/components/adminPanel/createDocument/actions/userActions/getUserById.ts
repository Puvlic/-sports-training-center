import axios from "axios";
import {api_url} from "../../../../../api_url";

export const getUserById = async (id: number) => {
    let user = await axios.get(`${api_url}/get-user/${id}`)
    return user.data
}