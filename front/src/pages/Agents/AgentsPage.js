import React, { useEffect, useState } from 'react';
import { Button, TextField, Snackbar, List, Paper, Container, Grid } from '@material-ui/core';
import { Rating, Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import AgentsList from './AgentsList';

export default (props) => {
    const [agents, setAgents] = useState([])
    useEffect(()=> {
        props.agentStore.getAllAvailable().then((result) => setAgents(result));
    }, [])

    function updateAgent(agent) {
        props.devStore.updateAgent(props.dev, agent).then((result) => {
            if(result.success) {
                props.errorManager.setError('Erreur')
            }
            else{
                props.errorManager.setError('Erreur')
            }
        })
    }

    return <AgentsList change={updateAgent} agents={agents} {...props} />
}