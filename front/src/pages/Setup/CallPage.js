import { Button, Grid, Paper } from '@material-ui/core';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

export default (props) => {
    const [choice, setChoice] = useState()
    if(choice == 'call'){
        return <Redirect to="/setup/agenda" />
    }
    else if(choice == 'profile'){
        return <Redirect to="/profile" />
    }

    const style = {textAlign: "center"}

    return <>
        <p>Votre agent est là pour apprendre à vous connaître, comprendre vos besoins et vos envies afin de vous proposez par la suite le cadre et le poste le plus adapté pour vous.</p>
        <p>Vous pouvez remplir seul votre profil ou bien attendre l'appel de votre agent pour qu'il le remplisse avec votre aide.</p>
        <Grid style={style} container spacing={8}>
            <Grid item xs={6}>
                <Paper>
                    <p>Je souhaite être appelé par mon agent pour mettre à jour ensemble mon profil</p>
                    <Button onClick={() => setChoice('call')}>Choisir</Button>
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper>
                    <p>Je souhaite mettre à jour mon profil d'abord</p>
                    <Button onClick={() => setChoice('profile')}>Choisir</Button>
                </Paper>
            </Grid>
        </Grid>
    </>
}