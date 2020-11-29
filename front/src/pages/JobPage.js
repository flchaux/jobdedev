import { Button, Container, Paper } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import PrioritiesWidget from '../components/wish/PrioritiesWidget'
import JobWishWidget from '../components/wish/JobWishWidget'
import PriorityManager from '../business/PriorityManager';
import UserContext from '../UserContext';
import SkillWishWidget from '../components/wish/SkillWishWidget';

export default function JobPage(props) {
    const dev = useContext(UserContext)

    const [wishManager] = useState({})
    const [priorityManager] = useState(() => PriorityManager(props.priorityStore, dev))

    const validate = function () {
        if (wishManager.wish.required.jobTitle && wishManager.wish.required.wage.value > 0 &&
            wishManager.wish.optional.jobTitle && wishManager.wish.optional.wage.value > 0) {
            priorityManager.updateAll()
            props.devStore.updateWish(dev, wishManager.wish)
        }
        else
            props.errorManager.setError('Tous les champs du formulaire sont obligatoires')
    }

    return <Paper style={{ padding: 32 }}>
        <h2>Vos attentes</h2>
        <p>On est avant tout là pour vous aider à obtenir le meilleur pour vous et ça commence évidemment par le poste, le salaire et les attentes légitimes que vous pouvez avoir.</p>
        <JobWishWidget {...props} wishManager={wishManager} />
        <PrioritiesWidget {...props} priorityManager={priorityManager} />
        <SkillWishWidget {...props} />
        <Container>
            <Button onClick={validate} style={{ margin: 'auto', display: 'block' }}>Continuer</Button>
        </Container>
    </Paper>
}