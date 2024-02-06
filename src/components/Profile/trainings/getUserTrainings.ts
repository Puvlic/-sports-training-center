import axios from "axios";
import {api_url} from "../../../api_url";

export const getUserTrainingsList = async (user_id: number) => {
    const trainings = await axios.get(`${api_url}/get-user-trainings/${user_id}`)
    return trainings.data
}