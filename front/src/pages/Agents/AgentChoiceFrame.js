import React, { useEffect, useState } from 'react';
import { Button, TextField, Snackbar, List, Paper, Container, Grid } from '@material-ui/core';
import { Rating, Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

export default (props) => {
    const agent = props.agent
    const style = {
        padding: 20,
        textAlign: "center"
    }
    const availabitity = agent.Availabilities === 'Fully' ? 'Très disponible' : 'Assez disponible';
    return <Paper style={style}>
            <h3>{agent.Name}</h3>
            <img src={agent.Picture[0].url} width={200} />
            <p>
                {agent.Description.split('\n').map((item, key) => <span key={key}>{item}<br/></span>)}
            </p>
            <h4>{availabitity}</h4>
            <Button onClick={() => props.change(agent)}>Choisir</Button>
        </Paper>
}