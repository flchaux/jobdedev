import { Button, Grid, Paper, TextField, IconButton, FormControlLabel, Container } from '@material-ui/core';
import React, { useEffect, useState, useRef } from 'react';

export default (props) => {
    const [experience, setExperience] = useState(props.experience ??
        {  
            StartDate: '',
            EndDate: '',
            Entreprise: '',
            Job: '',
            Description: '',
        })

    function newValueInputChange(event){
        const value = {...experience }
        value[event.target.name] = event.target.value
        setExperience(value)
    }

    const defaultInputStyle = {width: '100%'}
    
    return <>
    <Grid container spacing={4}>
        <Grid item xs={6}>
            <TextField name='StartDate' label="Date de début" placeholder="Date de début" type="date" style={defaultInputStyle} value={experience.StartDate} onChange={newValueInputChange} />
        </Grid>
        <Grid item xs={6}>
            <TextField name='EndDate' label="Date de fin" placeholder="Date de fin" type="date" style={defaultInputStyle} value={experience.EndDate} onChange={newValueInputChange} />
        </Grid>
        <Grid item xs={6}>
            <TextField name='Entreprise' label="Entreprise" placeholder="Entreprise" style={defaultInputStyle} value={experience.Entreprise} onChange={newValueInputChange} />
        </Grid>
        <Grid item xs={6}>
            <TextField name='Job' label="Nom du poste" placeholder="Nom du poste" style={defaultInputStyle} value={experience.Job} onChange={newValueInputChange} />
        </Grid>
        <Grid item xs={12}>
            <TextField name='Description' rowsMax={10} label="Missions et description" style={{width: '100%'}} multiline placeholder="Missions et description" value={experience.Description} onChange={newValueInputChange} />
        </Grid>
        <Grid item xs={12} style={{textAlign: 'center'}}>
                <Button onClick={() => props.onSubmit(experience)}>Valider</Button>
        </Grid>
    </Grid></>
}