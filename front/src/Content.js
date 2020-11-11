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
import SetupFlow from './pages/Setup/SetupFlow';

export default (props) => {
    let location = useLocation();
    const [error, setError] = useState(undefined)
    const errorManager =  {error: error, setError: setError}

    const setupFlow = SetupFlow({...props, errorManager: errorManager, location: location})
    return <div style={props.style}>
        <ErrorAlert error={error} setError={setError} />
        <Switch location={location}>
            <Route exact path="/profile"><Page><ProfilePage skillStore={props.skillStore} dev={props.dev} errorManager={errorManager} /></Page></Route>
            <Route exact path="/job"><Page><JobPage /></Page></Route>
            <Route exact path="/contact"><Page><ContactPage /></Page></Route>
            <Route exact path="/agents"><Page><AgentsPage agentStore={props.agentStore} dev={props.dev} devStore={props.devStore} errorManager={errorManager} /></Page></Route>
            <Route exact path="/agents"><Page><AgentsPage agentStore={props.agentStore} dev={props.dev} devStore={props.devStore} errorManager={errorManager} /></Page></Route>
            <Route exact path={"/setup"}><Page>{setupFlow.steps[0].page}</Page></Route>
            {setupFlow.steps.map(s => <Route key={s.key} exact path={"/setup/"+s.key}><Page>{s.page}</Page></Route>)}
        </Switch>
    </div>
}