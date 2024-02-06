import axios from "axios";
import {api_url} from "../../../api_url";

export interface INewUserInfo {
    id: number,
    name: string,
    surname: string,
    patronymic: string,
    gender: string,
    date_of_birth: string,
    number: string,
}

export const UpdateUser = async (newUserInfo: INewUserInfo) => {
    try {
        await axios.put(`${api_url}/user-update`, {
            //data: {
                id: newUserInfo.id,
                name: newUserInfo.name,
                surname: newUserInfo.surname,
                patronymic: newUserInfo.patronymic,
                gender: newUserInfo.gender,
                date_of_birth: newUserInfo.date_of_birth,
                phone_number: newUserInfo.number
            //}
        }).then()
    } catch (e) {
        console.log(12)
    }
}