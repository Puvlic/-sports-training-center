import axios from "axios";
import {api_url} from "../../../api_url";

export const CreateUserSubscription = async (user_id: number, subscription_id: number) => {
    try {
        await axios.post(`${api_url}/user-subscription/create`, {
            user_id: user_id,
            subscription_id: subscription_id
        })
    } catch (e) {

    }
}