import axios from "axios";
import {api_url} from "../../api_url";

export const getAllUsers = async () => {
    const users = await axios.get(`${api_url}/get-all-users`)
    return users.data
}