import {Dispatch} from "react";
import {TrainingCampAction, TrainingCampActionTypes} from "../../types/trainingCampTypes";
import {api_url} from "../../api_url";
import axios from "axios";

export const fetchTrainingCampMembers = (training_camp_id: number) => {
    return async (dispatch: Dispatch<TrainingCampAction>) => {
        try {
            const members = await axios.get(`${api_url}/training-camp-members/get-members/${training_camp_id}`)
            dispatch({type: TrainingCampActionTypes.fetchTrainingCampMembers, payload: members.data})
        } catch (e) {
            dispatch({type: TrainingCampActionTypes.fetchTrainingCampError, payload: "Ошибка загрузки"})
        }
    }
}

export const singUpTrainingCamp = (training_camp_id: number, user_id: number) => {
    return async (dispatch: Dispatch<TrainingCampAction>) => {
        await axios.post(`${api_url}/training-camp-leaders/create`, {
            training_camp_id: training_camp_id,
            user_id: user_id
        }).catch(

        )
    }
}

export const singOutTrainingCamp = (training_camp_id: number, user_id: number) => {
    return async (dispatch: Dispatch<TrainingCampAction>) => {
        await axios.delete(`${api_url}/training-camp-leaders/delete`, {
            data: {
                training_camp_id: training_camp_id,
                user_id: user_id
            }
        })
    }
}