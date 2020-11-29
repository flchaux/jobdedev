import { Drawer, Hidden } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import {
    Route, Switch,
    useLocation
} from 'react-router-dom';
import ErrorAlert from '../components/common/ErrorAlert';
import Header from './Header';
import Menu from '../Menu';
import AgentsPage from '../pages/AgentsPage';
import ContactPage from '../pages/ContactPage';
import JobPage from '../pages/JobPage';
import ProfilePage from '../pages/ProfilePage';
import Colors from '../Theme';
import UserContext from '../UserContext';


export default function AppLayout(props) {
    const dev = useContext(UserContext)
    let location = useLocation();
    const [error, setError] = useState(undefined)
    const errorManager = { error: error, setError: setError }
    const [drawerOpen, setDrawerOpen] = useState(false)

    return <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Header switchMenu={() => setDrawerOpen(!drawerOpen)} style={{
            zIndex: 2000,
            width: '100%',
            backgroundColor: Colors.primary,
            color: Colors.neutral,
            fontSize: '2em',
            padding: 20,
            boxSizing: 'border-box',
            display: 'flex',
        }
        } />
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <nav style={{ flexShrink: 0, }}>
                <Hidden smUp implementation="css">
                    <Drawer
                        variant="temporary"
                        open={drawerOpen}
                        onClose={() => setDrawerOpen(false)}
                        style={{
                            width: 240, flexShrink: 0,
                        }}
                    >
                        <Menu onClick={() => setDrawerOpen(false)} style={{
                            listStyle: "none",
                            padding: 20,
                            margin: 0,
                            width: 240,
                            marginTop: 80
                        }} />
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        variant="permanent"
                        style={{
                            width: 240, flexShrink: 0,
                        }}
                    >
                        <Menu style={{
                            listStyle: "none",
                            padding: 20,
                            margin: 0,
                            width: 240,
                            marginTop: 80
                        }} />
                    </Drawer>
                </Hidden>
            </nav>
            <main style={{
                backgroundColor: Colors.neutral,
                color: Colors.dark,
                padding: 20,
                flexGrow: 1,
                top: 120
            }}>
                <ErrorAlert errorManager={errorManager} />
                <Switch location={location}>
                    <Route exact path="/profile"><ProfilePage {...props} errorManager={errorManager} /></Route>
                    <Route exact path="/job"><JobPage {...props} errorManager={errorManager} /></Route>
                    <Route exact path="/contact"><ContactPage /></Route>
                    <Route exact path="/agents"><AgentsPage calendar={props.calendar} agentStore={props.agentStore} dev={dev} devStore={props.devStore} errorManager={errorManager} /></Route>
                </Switch>
            </main>
        </div >
    </div>
}