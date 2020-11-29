import { Container, Paper } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import AgentsList from '../../components/agent/AgentsList';
import UserContext from '../../UserContext';

export default function AdoptPage(props) {
    const dev = useContext(UserContext)
    const [agents, setAgents] = useState([])
    const [success, setSuccess] = useState(false)
    useEffect(() => {
        props.agentStore.getAllAvailable().then((result) => setAgents(result));
    }, [props.agentStore, setAgents])

    function updateAgent(agent) {
        props.devStore.updateAgent(dev, agent).then((result) => {
            if (result.success) {
                dev.agent = agent
                setSuccess(true)
            }
            else {
                props.errorManager.setError('Erreur')
            }
        })
    }
    if (success) {
        return props.next()
    }
    return <Container>
        <Paper style={{ padding: 6, textAlign: 'center' }}>
            <h2>Choisis ton agent</h2>
            <p>Ton agent est là pour te trouver le JobDeDev de tes rêves</p>
        </Paper>
        <AgentsList style={{ marginTop: 12 }} change={updateAgent} agents={agents} {...props} />
    </Container>
}