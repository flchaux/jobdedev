import React, { useEffect, useState } from 'react';
import Menu from './Menu';
import Content from './Content';
import Loading from './Loading';
import { BrowserRouter } from 'react-router-dom';
import Colors from './Theme';
import Login from './Login';
import DeveloperStore from './business/DeveloperStore';
import AirtableHelper from './data/AirtableHelper';


function App() {
  console.log('App')
  const [ dev, setDev ] = useState(null)
  useEffect(() => {
    if(localStorage.getItem('app-token')){
      DeveloperStore(new AirtableHelper('keytoBw0zQgeVS3cb', 'appltRU3GEjhRaQiH')).getByToken(localStorage.getItem('app-token')).then((result) => 
        {
          setDev(result)
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
        <Content />
      </main>
    </BrowserRouter>
  );
}

export default App;
