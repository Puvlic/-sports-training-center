import axios from "axios";
import {api_url} from "../../../api_url";

export const GetSubscription = async (subscription_id: number) => {
    const subscription = await axios.get(`${api_url}/get_one_subscription/${subscription_id}`)
    return subscription.data
}