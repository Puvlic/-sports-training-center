import {applyMiddleware, legacy_createStore as createStore} from 'redux';
import {rootReducer} from "./reducers";
import thunk from "redux-thunk";

export const store = createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
type RootStore = ReturnType<typeof store>

declare global {
    interface Window {
        store: RootStore;
    }
}

window.store = store