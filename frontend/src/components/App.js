import {useState, useEffect, createContext} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React from 'react';
import Home from '../pages/Home'
import Profile from '../pages/Profile'
import Notifications from '../pages/Notifications'
import Settings from '../pages/Settings'
import RightBarSection from './rightBarSection';


const App = ()=>{
   

    return (
       <BrowserRouter>
            <Routes>
                <Route path="/frontend/" element={<RightBarSection/>}>
                    <Route index element={<Home/>}/>
                    <Route path="profile" element={<Profile/>}/>
                    <Route path="notifications" element={<Notifications/>}/>
                    <Route path="settings" element={<Settings/>}/>
                </Route>
            </Routes>
       </BrowserRouter>
    )
}

export default App;



