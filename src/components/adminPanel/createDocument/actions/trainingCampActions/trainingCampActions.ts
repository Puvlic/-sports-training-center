import axios from "axios";
import {api_url} from "../../../../../api_url";

export const getTrainingCampById = async (id: number) => {
    let trainingCamp = await axios.get(`${api_url}/training-camp/get-one/${id}`)
    return trainingCamp.data
}