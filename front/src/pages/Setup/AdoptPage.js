import { Container, Paper } from '@material-ui/core';
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
        return props.next()
    }
    return <Container>
        <Paper style={{padding: 6, textAlign: 'center'}}>
            <h2>Choisis ton agent</h2>
            <p>Ton agent est là pour te trouver le JobDeDev de tes rêves</p>
        </Paper>
        <AgentsList style={{marginTop: 12}} change={updateAgent} agents={agents} {...props} />
        </Container>
}