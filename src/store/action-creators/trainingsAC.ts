import {Dispatch} from "react";
import {TrainingsActions, TrainingsActionTypes} from "../../types/trainingsTypes";
import axios from "axios";
import {api_url} from "../../api_url";

export const fetchTrainings = () => {
    return async (dispatch: Dispatch<TrainingsActions>) => {
        try {
            dispatch({type: TrainingsActionTypes.fetchTrainingsLoading})
            const trainings = await axios.get(`${api_url}/get-all-training`)

            setTimeout(() => {
                dispatch({type: TrainingsActionTypes.fetchTrainings, payload: trainings.data})
            }, 1200)
        } catch (e) {
            dispatch({type: TrainingsActionTypes.fetchTrainingsError, payload: "Ошибка загрузки списка тренировок"})
        }
    }
}