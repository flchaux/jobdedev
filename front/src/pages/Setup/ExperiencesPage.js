import { Button, Paper } from '@material-ui/core';
import React, { useState } from 'react';
import ExperiencesWidget from '../../components/experience/ExperiencesWidget';
import SkillsWidget from '../../components/skill/SkillsWidget';

export default function ExperiencesPage(props) {
    const [choice, setChoice] = useState()
    function next() {
        setChoice('next')
    }

    if (choice) {
        return props.next()
    }

    return <>
        <Paper style={{ padding: 12, margin: 12 }}>
            <ExperiencesWidget {...props} />
        </Paper>
        <Paper style={{ padding: 12, margin: 12 }}>
            <SkillsWidget {...props} />
        </Paper>
        <Paper style={{ textAlign: 'center', margin: 12 }}>
            <Button onClick={next}>Continuer</Button>
        </Paper>
    </>
}