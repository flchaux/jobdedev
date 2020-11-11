import React, {useState} from 'react';
import {  Switch, Route,
    useLocation
   } from 'react-router-dom'

import Page from './Page'
import ProfilePage from './pages/Profile/ProfilePage'
import JobPage from './pages/JobPage'
import ContactPage from './pages/ContactPage'
import AgentsPage from './pages/Agents/AgentsPage';
import ErrorAlert from './components/ErrorAlert';
import AdoptPage from './pages/Setup/AdoptPage';
import CallPage from './pages/Setup/CallPage';
import AgendaPage from './pages/Setup/AgendaPage';
import EventPage from './pages/Setup/EventPage';
import WishPage from './pages/Setup/WishPage';
import ExperiencesPage from './pages/Setup/Experience/ExperiencesPage';

export default (props) => {
    let location = useLocation();
    const [error, setError] = useState(undefined)
    const errorManager =  {error: error, setError: setError}
    return <div style={props.style}>
        <ErrorAlert error={error} setError={setError} />
        <Switch location={location}>
            <Route exact path="/profile"><Page><ProfilePage skillStore={props.skillStore} dev={props.dev} errorManager={errorManager} /></Page></Route>
            <Route exact path="/job"><Page><JobPage /></Page></Route>
            <Route exact path="/contact"><Page><ContactPage /></Page></Route>
            <Route exact path="/agents"><Page><AgentsPage agentStore={props.agentStore} dev={props.dev} devStore={props.devStore} errorManager={errorManager} /></Page></Route>
            <Route exact path="/setup/(adopt)?"><Page><AdoptPage agentStore={props.agentStore} dev={props.dev} devStore={props.devStore} errorManager={errorManager} /></Page></Route>
            <Route exact path="/setup/call"><Page><CallPage agentStore={props.agentStore} dev={props.dev} devStore={props.devStore} errorManager={errorManager} /></Page></Route>
            <Route exact path="/setup/agenda"><Page><AgendaPage calendar={props.calendar} agentStore={props.agentStore} dev={props.dev} devStore={props.devStore} errorManager={errorManager} /></Page></Route>
            <Route exact path="/setup/event"><Page><EventPage /></Page></Route>
            <Route exact path="/setup/wish"><Page><WishPage dev={props.dev} priorityStore={props.priorityStore} devStore={props.devStore} jobTitleStore={props.jobTitleStore} errorManager={errorManager} /></Page></Route>
            <Route exact path="/setup/experiences"><Page><ExperiencesPage dev={props.dev} devStore={props.devStore} experienceStore={props.experienceStore} errorManager={errorManager} /></Page></Route>
        </Switch>
    </div>
}