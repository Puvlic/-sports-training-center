import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/header/header";
import LoginAndRegisterWindow from "./components/loginAndRegisterWindow/loginAndRegisterWindow";
import Main from "./components/main/main";
import Subscriptions from "./components/Subscriptions/Subscriptions";
import Events from "./components/events/events"
import EventPage from "./components/events/eventPage/eventPage";
import Profile from "./components/Profile/profile";
import ChangeUserInfo from "./components/Profile/changeUserInfo/changeUserInfo";
import TrainingCampsPage from "./components/Profile/trainingCampsPage/trainingCampsPage";
import BuySubscription from "./components/Subscriptions/buySubscription/buySubscription";
import Trainings from "./components/trainings/trainings";
import TrainingsPage from "./components/Profile/trainings/trainingsPage";
import Competition from "./components/events/competition/competition";
import CompetitionPage from "./components/Profile/competitionsPage/competitionPage";
import AdminPanel from "./components/adminPanel/adminPanel";
import DocumentCreator from "./components/adminPanel/documentCreator/documentCreator";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header/>
                <LoginAndRegisterWindow/>
                <Routes>
                    <Route path='' element={<Main />}></Route>
                    <Route path='/subscriptions' element={<Subscriptions />}></Route>
                    <Route path='/subscriptions/buy/:id' element={<BuySubscription />}></Route>
                    <Route path='/events' element={<Events />}></Route>
                    <Route path='/events/:id' element={<EventPage />}></Route>
                    <Route path='/competition/:id' element={<Competition />}></Route>
                    <Route path='/profile' element={<Profile />}></Route>
                    <Route path='/profile/change_info' element={<ChangeUserInfo />}></Route>
                    <Route path='/profile/training_camps' element={<TrainingCampsPage />}></Route>
                    <Route path='/profile/trainings' element={<TrainingsPage />}></Route>
                    <Route path='/profile/competitions' element={<CompetitionPage />}></Route>
                    <Route path='/trainings' element={<Trainings />}></Route>
                    <Route path='/profile/admin_panel' element={<AdminPanel />}></Route>
                    <Route path='/profile/admin_panel/document_creator' element={<DocumentCreator />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
