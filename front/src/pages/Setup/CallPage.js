import { Button, Container, Grid, Paper } from '@material-ui/core';
import React, { useState } from 'react';

export default function CallPage(props) {
    const [choice, setChoice] = useState()
    if (choice) {
        return props.next(choice)
    }
    const style = { textAlign: "center" }

    return <Container style={{ padding: 12 }}>
        <Paper style={{ padding: 10, marginBottom: 12 }}>
            <h2>On est là pour vous aider</h2>
            <p>Votre agent est là pour apprendre à vous connaître, comprendre vos besoins et vos envies afin de vous proposez par la suite le cadre et le poste le plus adapté pour vous.</p>
            <p>Vous pouvez remplir seul votre profil ou bien attendre l'appel de votre agent pour qu'il le remplisse avec votre aide.</p>
        </Paper>
        <div>
            <Grid style={style} container spacing={4} justify='center' alignItems='center'>
                <Grid item xs={6}>
                    <Paper style={{ padding: 10 }}>
                        <p>Je souhaite être appelé par mon agent pour mettre à jour ensemble mon profil</p>
                        <Button onClick={() => setChoice('call')}>Choisir</Button>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper style={{ padding: 10 }}>
                        <p>Je souhaite mettre à jour mon profil d'abord</p>
                        <Button onClick={() => setChoice('profile')}>Choisir</Button>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    </Container>
}