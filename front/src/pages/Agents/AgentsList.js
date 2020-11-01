import React, { useEffect, useState } from 'react';
import { Button, TextField, Snackbar, List, Paper, Container, Grid } from '@material-ui/core';
import { Rating, Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import AgentChoiceFrame from './AgentChoiceFrame'
import ErrorAlert from '../../components/ErrorAlert';

export default (props) => {

    return <>
        <Grid direction="row" container spacing={4}>
            {props.agents.map((agent) =>  {
                return <Grid xs={6} item key={agent.Email}><AgentChoiceFrame agent={agent} change={props.change} /></Grid>
            })}
        </Grid>
    </>
}