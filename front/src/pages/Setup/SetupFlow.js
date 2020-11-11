import React, {useState} from 'react';
import AdoptPage from './AdoptPage';
import CallPage from './CallPage';
import AgendaPage from './AgendaPage';
import EventPage from './EventPage';
import WishPage from './WishPage';
import ExperiencesPage from './Experience/ExperiencesPage';
import { Redirect } from 'react-router-dom';
import TraitsPage from './TraitsPage';
import FinishPage from './FinishPage';

export default (props)=>{
    function nextStep(choice){
        console.log(currentStep)
        if(currentStep == -1){
            return <Redirect to='/setup/finish' />
        }
        else{ 
            if(steps[currentStep].key == 'call'){
                if(choice != 'call'){
                    return <Redirect to='/setup/wish' />
                }
                return <Redirect to='/setup/agenda' />
            }
            else{
                return <Redirect to={'/setup/'+steps[currentStep+1].key} />
            }
        }
    }
    const steps = [
        {key: 'adopt', page: <AdoptPage next={nextStep} agentStore={props.agentStore} dev={props.dev} devStore={props.devStore} errorManager={props.errorManager} />},
        {key: 'call', page: <CallPage next={nextStep} agentStore={props.agentStore} dev={props.dev} devStore={props.devStore} errorManager={props.errorManager} />},
        {key: 'agenda', page:<AgendaPage next={nextStep} calendar={props.calendar} agentStore={props.agentStore} dev={props.dev} devStore={props.devStore} errorManager={props.errorManager} />},
        {key: 'event', page:<EventPage next={nextStep} />},
        {key: 'wish', page:<WishPage next={nextStep} dev={props.dev} priorityStore={props.priorityStore} devStore={props.devStore} jobTitleStore={props.jobTitleStore} errorManager={props.errorManager} /> },
        {key: 'experiences', page:<ExperiencesPage next={nextStep}  skillStore={props.skillStore} dev={props.dev} devStore={props.devStore} experienceStore={props.experienceStore} errorManager={props.errorManager} />},
        {key: 'traits', page:<TraitsPage next={nextStep} dev={props.dev} traitStore={props.traitStore} devStore={props.devStore} errorManager={props.errorManager} />},
        {key: 'finish', page:<FinishPage next={nextStep} dev={props.dev} devStore={props.devStore} />}
    ]
    const pathParts = props.location.pathname.split('/')
    const stepKey = pathParts.length > 2 && pathParts[1] == 'setup' ? pathParts[2] : steps[0].key
    const currentStep = stepKey ? steps.indexOf(steps.find((s) => s.key == stepKey)) : 0

    return {
        steps: steps
    }
}