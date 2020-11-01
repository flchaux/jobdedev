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


function App() {
  console.log('App')
  const [ dev, setDev ] = useState(null)
  const database = new AirtableHelper('keytoBw0zQgeVS3cb', 'appltRU3GEjhRaQiH')
  const skillStore = SkillStore(database)
  const agentStore = AgentStore(database)
  const devStore = DeveloperStore(database)

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
        <Menu />
        <Content skillStore={skillStore} agentStore={agentStore} devStore={devStore} dev={dev} />
      </main>
    </BrowserRouter>
  );
}

export default App;
