import React, { useEffect, useState } from 'react';
import Menu from './Menu';
import Content from './Content';
import Loading from './Loading';
import { BrowserRouter } from 'react-router-dom';
import Colors from './Theme';
import Login from './Login';
import DeveloperStore from './business/DeveloperStore';
import AirtableHelper from './data/AirtableHelper';
import SkillStore from './business/SkillStore';
import AgentStore from './business/AgentStore';
import JobTitleStore from './business/JobTitleStore';
import CalendarManager from './business/CalendarManager';
import BusinessApi from './data/BusinessApi';
import { Grid } from '@material-ui/core';
import PriorityStore from './business/PriorityStore';
import ExperienceStore from './business/ExperienceStore';


function App() {
  const [ dev, setDev ] = useState(null)
  const database = new AirtableHelper('keytoBw0zQgeVS3cb', 'appltRU3GEjhRaQiH')
  const skillStore = SkillStore(database)
  const agentStore = AgentStore(database)
  const devStore = DeveloperStore(database)
  const jobTitleStore = JobTitleStore(database)
  const priorityStore = PriorityStore(database)
  const experienceStore = ExperienceStore(database)

  useEffect(() => {
    if(localStorage.getItem('app-token')){
      devStore.getByToken(localStorage.getItem('app-token')).then(async (dev) => 
        {
          if(dev.Agent.length === 1){
            agentStore.getById(dev.Agent[0]).then((result) => {
              dev.agent = result
              setDev(dev)
            })
          }
          else{
            setDev(dev)
          }
        }
      )
    }
  }, [])
  if(dev == null){
    if(!localStorage.getItem('app-token')){
      return <Login />
    }
    else{
      return Loading();
    }
  }
  
  const api = new BusinessApi('http://localhost:80', dev.AppToken)
  return (
    <BrowserRouter>
      <header style={{
        width: '100%',
        backgroundColor: Colors.primary,
        color: Colors.neutral,
        fontSize: '2em',
        padding: 20,
        boxSizing: 'border-box',
      }}>
        JobDeDev - Bonjour {dev.FirstName} - {dev.Email}
      </header>
      <main>
        <Grid direction="row" container>
          <Grid item xs={2}>
            <Menu style={{
              listStyle: "none",
              backgroundColor: Colors.light,
              padding: 20,
              margin: 0
            }} />
          </Grid>
          <Grid item xs={10}>
            <Content
                style={{
                  backgroundColor: Colors.neutral,
                  color: Colors.dark,
                  padding: 20,
                }}
              calendar={new CalendarManager(api)} 
              priorityStore={priorityStore}
              jobTitleStore={jobTitleStore} 
              skillStore={skillStore} 
              agentStore={agentStore} 
              devStore={devStore}
              experienceStore={experienceStore}
               dev={dev} />
          
          </Grid>
          
          
        </Grid>
      </main>
    </BrowserRouter>
  );
}

export default App;
