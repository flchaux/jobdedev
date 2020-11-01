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

export default (props) => {
    let location = useLocation();
    const [error, setError] = useState(undefined)
    const errorManager =  {error: error, setError: setError}
    return <>
        <ErrorAlert error={error} setError={setError} />
        <Switch location={location}>
            <Route exact path="/profile"><Page><ProfilePage skillStore={props.skillStore} dev={props.dev} /></Page></Route>
            <Route exact path="/job"><Page><JobPage /></Page></Route>
            <Route exact path="/contact"><Page><ContactPage /></Page></Route>
            <Route exact path="/agents"><Page><AgentsPage agentStore={props.agentStore} dev={props.dev} devStore={props.devStore} errorManager={errorManager} /></Page></Route>
            <Route exact path="/setup/(adopt)?"><Page><AdoptPage agentStore={props.agentStore} dev={props.dev} devStore={props.devStore} errorManager={errorManager} /></Page></Route>
            <Route exact path="/setup/call"><Page><CallPage agentStore={props.agentStore} dev={props.dev} devStore={props.devStore} errorManager={errorManager} /></Page></Route>
            <Route exact path="/setup/agenda"><Page><AgendaPage agentStore={props.agentStore} dev={props.dev} devStore={props.devStore} errorManager={errorManager} /></Page></Route>
        </Switch>
    </>
}