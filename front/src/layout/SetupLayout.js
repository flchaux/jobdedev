import React, { useState, Suspense, lazy } from 'react';
import {
    Switch, Route,
    useLocation,
    Redirect
} from 'react-router-dom'

import ErrorAlert from '../components/common/ErrorAlert';
import Colors from '../Theme'

export default function SetupLayout(props) {
    const style = {
        backgroundColor: Colors.neutral,
        color: Colors.dark,
        padding: 20,
    }
    let location = useLocation();
    const [error, setError] = useState(undefined)
    const errorManager = { error: error, setError: setError }

    function nextStep(choice) {
        if (currentStep === -1) {
            return <Redirect push to='/setup/finish' />
        }
        else {
            if (steps[currentStep].key === 'agenda') {
                return <Redirect push to='/setup/finish' />
            }
            else if (steps[currentStep].key === 'call') {
                if (choice !== 'call') {
                    return <Redirect push to='/setup/wish' />
                }
                return <Redirect push to='/setup/agenda' />
            }
            else {
                return <Redirect push to={'/setup/' + steps[currentStep + 1].key} />
            }
        }
    }
    const basePath = 'pages/Setup'

    const steps = [
        { key: 'adopt', page: lazy(() => import('../' + basePath + '/AdoptPage')) },
        { key: 'call', page: lazy(() => import('../' + basePath + '/CallPage')) },
        { key: 'agenda', page: lazy(() => import('../' + basePath + '/AgendaPage')) },
        { key: 'event', page: lazy(() => import('../' + basePath + '/EventPage')) },
        { key: 'wish', page: lazy(() => import('../' + basePath + '/WishPage')) },
        { key: 'experiences', page: lazy(() => import('../' + basePath + '/ExperiencesPage')) },
        { key: 'traits', page: lazy(() => import('../' + basePath + '/TraitsPage')) },
        { key: 'finish', page: lazy(() => import('../' + basePath + '/FinishPage')) },
    ]
    const pathParts = location.pathname.split('/')
    const stepKey = pathParts.length > 2 ? pathParts[2] : steps[0].key
    const currentStep = stepKey ? steps.indexOf(steps.find((s) => s.key === stepKey)) : 0

    const pageProps = {
        errorManager: errorManager,
        next: nextStep,
        ...props
    }

    return <div style={style}>
        <ErrorAlert errorManager={errorManager} />
        <Suspense fallback={<div>Chargement en cours</div>}>
            <Switch location={location}>
                {steps.map(s => <Route key={s.key} exact path={"/setup/" + s.key} render={() => {
                    const RoutePage = s.page
                    return <RoutePage {...pageProps} />
                }}></Route>)}
                <Route path='/setup' exact render={() => {
                    const DefaultPage = steps[0].page
                    return <DefaultPage {...pageProps} />
                }}></Route>
            </Switch>
        </Suspense>
    </div >
}