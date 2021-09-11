import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AgentStore from './business/AgentStore';
import CalendarManager from './business/CalendarManager';
import DeveloperStore from './business/DeveloperStore';
import EventStore from './business/EventStore';
import ExperienceStore from './business/ExperienceStore';
import JobTitleStore from './business/JobTitleStore';
import PriorityStore from './business/PriorityStore';
import SkillStore from './business/SkillStore';
import SkillTypeStore from './business/SkillTypeStore';
import TraitStore from './business/TraitStore';
import AirtableHelper from './data/AirtableHelper';
import BusinessApi from './data/BusinessApi';
import Loading from './Loading';
import Login from './Login';
import SetupLayout from './layout/SetupLayout';
import AppLayout from './layout/AppLayout';
import amplitude from 'amplitude-js'
import AppController from './AppController';
import UserContext from './UserContext'


function App() {
  const [dev, setDev] = useState(null)
  const database = new AirtableHelper(process.env.REACT_APP_API_KEY, process.env.REACT_APP_BASE)
  const [[skillStore, skillTypeStore, agentStore, devStore, jobTitleStore, priorityStore, experienceStore, traitStore, eventStore]] = useState([
    SkillStore(database),
    SkillTypeStore(database),
    AgentStore(database),
    DeveloperStore(database),
    JobTitleStore(database),
    PriorityStore(database),
    ExperienceStore(database),
    TraitStore(database),
    EventStore(database),
  ])

  useEffect(() => {
    if (localStorage.getItem('app-token')) {
      devStore.getByToken(localStorage.getItem('app-token')).then(async (dev) => {
        if (dev) {
          if (dev.Agent && dev.Agent.length === 1) {
            agentStore.getById(dev.Agent[0]).then((result) => {
              dev.agent = result
              setDev(dev)
            })
          }
          else {
            setDev(dev)
          }
        }
        else {
          localStorage.removeItem('app-token')
        }
      }
      )
    }
  }, [agentStore, devStore])

  if (dev == null) {
    if (!localStorage.getItem('app-token')) {

      if (process.env.NODE_ENV === 'production') {
        return <Login />
      }
      else {
        return <h2>Development - Pas de app-token</h2>
      }
    }
    else {
      return Loading();
    }
  }

  var apiUrl;
  console.log(process.env.NODE_ENV)
  if (process.env.NODE_ENV === 'production') {
    apiUrl = window.location.protocol + '//' + window.location.hostname;
    amplitude.getInstance().init(process.env.REACT_APP_AMPLITUDE);
  }
  else {
    apiUrl = 'http://localhost:80';
  }


  const api = new BusinessApi(apiUrl, dev.AppToken)

  const businessStores = {
    calendar: new CalendarManager(api),
    skillStore,
    skillTypeStore,
    priorityStore,
    jobTitleStore,
    agentStore,
    devStore,
    experienceStore,
    traitStore,
    eventStore,
    dev,
  }
  return (
    <UserContext.Provider value={dev}>
      <BrowserRouter>
        <AppController>
          <Switch>
            <Route path="/setup">
              <SetupLayout {...businessStores} />
            </Route>
            <Route path="/">
              <AppLayout {...businessStores} />
            </Route>
          </Switch>
        </AppController>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
