import axios from "axios";
import {api_url} from "../../../api_url";

export const GetTrainingCampsByUserId = async (id: number) => {
    const trainingCamps = await axios.get(`${api_url}/training-camp/get-by-id/${id}`)
    return trainingCamps.data
}