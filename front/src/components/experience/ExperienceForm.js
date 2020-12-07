import { Button, Grid, IconButton, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React, { useState } from 'react';

export default function ExperienceForm(props) {
    const [experience, setExperience] = useState(props.experience ??
    {
        StartDate: '',
        EndDate: '',
        Entreprise: '',
        Job: '',
        Description: '',
    })

    function newValueInputChange(event) {
        const value = { ...experience }
        value[event.target.name] = event.target.value
        setExperience(value)
    }

    function validateForm() {
        props.onSubmit(experience)
    }

    const defaultInputStyle = { width: '100%' }

    return <div>
        <IconButton onClick={props.onCancel} style={{ float: 'right' }}>
            <CloseIcon />
        </IconButton>
        <div style={{ margin: 20 }}>
            <Grid container spacing={4}>
                <Grid item xs={6}>
                    <TextField required InputLabelProps={{ shrink: true }} name='StartDate' label="Date de début" type="date" style={defaultInputStyle} value={experience.StartDate} onChange={newValueInputChange} />
                </Grid>
                <Grid item xs={6}>
                    <TextField InputLabelProps={{ shrink: true }} name='EndDate' label="Date de fin" type="date" style={defaultInputStyle} value={experience.EndDate} onChange={newValueInputChange} />
                </Grid>
                <Grid item xs={6}>
                    <TextField required name='Entreprise' label="Entreprise" placeholder="Entreprise" style={defaultInputStyle} value={experience.Entreprise} onChange={newValueInputChange} />
                </Grid>
                <Grid item xs={6}>
                    <TextField required name='Job' label="Nom du poste" placeholder="Nom du poste" style={defaultInputStyle} value={experience.Job} onChange={newValueInputChange} />
                </Grid>
                <Grid item xs={12}>
                    <TextField name='Description' rowsMax={10} label="Missions et description" style={{ width: '100%' }} multiline placeholder="Missions et description" value={experience.Description} onChange={newValueInputChange} />
                </Grid>
                <Grid item xs={12} style={{ textAlign: 'center' }}>
                    <Button onClick={validateForm}>Valider</Button>
                </Grid>
            </Grid>
        </div>
    </div>
}