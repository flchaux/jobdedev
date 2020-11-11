import { Button, Grid, Paper } from '@material-ui/core';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

export default (props) => {
    const [choice, setChoice] = useState()
    if(choice == 'profile'){
        return <Redirect to="/profile" />
    }

    const style = {textAlign: "center"}

    return <>
        <p>Votre agent va vous appeler à l'horaire souhaité :) Vous pouvez attendre son appel ou continuer de remplir votre profil</p>
        <Grid style={style} container spacing={8}>
            <Grid item xs={6}>
                <Paper>
                    <p></p>
                    <Button onClick={() => setChoice('profile')}>Remplir mon profil</Button>
                </Paper> 
            </Grid>
        </Grid>
    </>
}