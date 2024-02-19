import axios from "axios";
import {api_url} from "../../../../../api_url";

export const getOrganizerById = async (id: number) => {
    let organizer = await axios.get(`${api_url}/get-one-organizer/${id}`)
    return organizer.data
}