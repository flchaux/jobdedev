import React, { useEffect, useState } from 'react';
import { Button, TextField, Snackbar, List, Paper, Container, Grid } from '@material-ui/core';
import { Rating, Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import AgentChoiceFrame from '../Agents/AgentChoiceFrame'
import ErrorAlert from '../../components/ErrorAlert';
import AgentsList from '../Agents/AgentsList';
import { Redirect } from 'react-router-dom';

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