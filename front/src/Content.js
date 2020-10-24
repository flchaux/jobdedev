import React from 'react';
import {  Switch, Route,
    useLocation
   } from 'react-router-dom'

import Page from './Page'
import ProfilePage from './pages/ProfilePage'
import JobPage from './pages/JobPage'
import ContactPage from './pages/ContactPage'

export default () => {
    let location = useLocation();
    return <div>
        <Switch location={location}>
            <Route exact path="/profile"><Page><ProfilePage /></Page></Route>
            <Route exact path="/job"><Page><JobPage /></Page></Route>
            <Route exact path="/contact"><Page><ContactPage /></Page></Route>
        </Switch>
    </div>
}