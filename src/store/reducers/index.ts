import {combineReducers} from "redux";
import {userReducer} from "./userReducer";
import {LoginAndRegisterWindowReducer} from "./loginAndRegisterWindowReducer";
import {SubscriptionsReducer} from "./subscriptionsReducer";
import {CalendarReducer} from "./calendarReducer";
import {TrainingCampReducer} from "./trainingCampReducer";
import {TrainingsReducer} from "./trainingsReducer";

export const rootReducer = combineReducers({
    user: userReducer,
    login_and_register_window: LoginAndRegisterWindowReducer,
    subscriptions: SubscriptionsReducer,
    calendar: CalendarReducer,
    training_camp: TrainingCampReducer,
    trainings: TrainingsReducer,
})

export type RootReducer = ReturnType<typeof rootReducer>