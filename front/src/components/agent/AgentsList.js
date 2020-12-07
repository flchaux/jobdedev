import { Grid } from '@material-ui/core';
import React from 'react';
import AgentChoiceFrame from './AgentChoiceFrame';

export default function AgentsList(props) {

    return <Grid style={props.style} direction="row" container spacing={4}>
        {props.agents.map((agent) => {
            return <Grid xs item key={agent.Email}><AgentChoiceFrame calendar={props.calendar} agent={agent} change={props.change} /></Grid>
        })}
    </Grid>
}