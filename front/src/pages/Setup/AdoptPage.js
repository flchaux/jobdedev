import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import AgentsList from '../Agents/AgentsList';

export default (props) => {
    const [agents, setAgents] = useState([])
    const [success, setSuccess] = useState(false)
    useEffect(()=> {
        props.agentStore.getAllAvailable().then((result) => setAgents(result));
    }, [])

    function updateAgent(agent) {
        props.devStore.updateAgent(props.dev, agent).then((result) => {
            if(result.success) {
                props.dev.agent = agent
                setSuccess(true)
            }
            else{
                props.errorManager.setError('Erreur')
            }
        })
    }
    if(success){
        return <Redirect to="/setup/call" />
    }
    return <AgentsList change={updateAgent} agents={agents} {...props} />
}