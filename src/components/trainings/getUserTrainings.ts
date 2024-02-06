import axios from "axios";
import {api_url} from "../../api_url";

export const getUserTrainings = async (user_id: number) => {
    const user_trainings = await axios.get(`${api_url}/get-user-trainings-by-user-id/${user_id}`)

    const user_trainings_id = []

    for (let i = 0; i < user_trainings.data.length; i++) {
        user_trainings_id.push(user_trainings.data[i].training_id)
    }
    return user_trainings_id
}

export const addUserInTraining = async (user_id: number, training_id: number) => {
    await axios.post(`${api_url}/add-user`, {
        user_id: user_id,
        training_id: training_id,
    })
}

export const deleteUserFromTraining = async (user_id: number, training_id: number) => {
    await axios.delete(`${api_url}/remove-user`, {
        data: {
            user_id: user_id,
            training_id: training_id,
        }
    })
}