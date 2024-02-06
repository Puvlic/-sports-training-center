import * as userActions from "../store/action-creators/userAC"
import * as loginAndRegisterWindowActions from "../store/action-creators/loginAndRegisterWindowAC"
import * as subscriptionsActions from "../store/action-creators/subscriptionsAC"
import * as calendarActions from "../store/action-creators/calendarAC"
import * as trainingCampActions from "../store/action-creators/trainingCampAC"
import * as trainingsActions from "../store/action-creators/trainingsAC"
import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";

const allActions = {
    ...userActions,
    ...loginAndRegisterWindowActions,
    ...subscriptionsActions,
    ...calendarActions,
    ...trainingCampActions,
    ...trainingsActions,
}

export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(allActions, dispatch)
}