import { Button, Grid, Paper } from '@material-ui/core';
import React, { useState } from 'react';

export default function EventPage(props) {
    const [choice, setChoice] = useState()
    if (choice === 'profile') {
        return props.next()
    }

    const style = { textAlign: "center" }

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