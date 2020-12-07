import { Container, Grid, Paper } from '@material-ui/core';
import React from 'react';
import ExperiencesWidget from '../components/experience/ExperiencesWidget';
import PersonalForm from '../components/PersonalForm';
import SkillsWidget from '../components/skill/SkillsWidget';

export default function ProfilePage(props) {

    return <div className="page">
        <Grid container>
            <Grid item xs={12}>
                <Paper style={{ padding: 12, margin: 12 }}>
                    <Container maxWidth='md'>
                        <PersonalForm {...props} />
                    </Container>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper style={{ padding: 12, margin: 12 }}>
                    <SkillsWidget {...props} />
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper style={{ padding: 12, margin: 12 }}>
                    <ExperiencesWidget {...props} />
                </Paper>
            </Grid>
        </Grid>
    </div>
}