import { FormControl, FormGroup, FormLabel, Grid, TextField } from "@material-ui/core";
import React, { useState, useContext } from "react";
import UserContext from '../UserContext'

export default function PersonalForm(props) {

    const dev = useContext(UserContext)

    const inputStyle = { width: '100%' }
    const [form, setForm] = useState({
        firstName: dev.FirstName,
        lastName: dev.LastName,
        email: dev.Email,
        birthDate: dev.BirthDate
    })

    function updateForm(target) {
        const newForm = { ...form }
        console.log(target)
        newForm[target.name] = target.value
        console.log(newForm)
        props.devStore.updateBirthDate(dev, newForm.birthDate)
        setForm(newForm)
    }

    return <FormControl>
        <FormLabel>Vos informations personnelles</FormLabel>
        <FormGroup>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                    <TextField disabled label="Prénom" name="firstName" value={form.firstName} style={inputStyle} onChange={(e) => updateForm(e.target)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField disabled label="Nom" name="lastName" value={form.lastName} style={inputStyle} onChange={(e) => updateForm(e.target)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField disabled label="Adresse e-mail" name="email" type="email" style={inputStyle} value={form.email} onChange={(e) => updateForm(e.target)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField InputLabelProps={{ shrink: true }} name="birthDate" label="Date de naissance" type="date" style={inputStyle} value={form.birthDate} onChange={(e) => updateForm(e.target)} />
                </Grid>
            </Grid>
        </FormGroup>
    </FormControl>
}