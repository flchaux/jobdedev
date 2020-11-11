import { Button, Grid, Paper, TextField, IconButton, Container } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import {  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import React, { useEffect, useState, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import ExperienceItem from './ExperienceItem';
import AddIcon from '@material-ui/icons/Add'
import moment from 'moment';
import ExperienceForm from './ExperienceForm';
import SkillsWidget from '../SkillsWidget';

export default (props) => {
    const defaultExperience = () => {
        return {  
            StartDate: '',
            Entreprise: '',
            Job: '',
            Description: '',
        }
    }
    const [choice, setChoice] = useState()
    const [experienceToDelete, setExperienceToDelete] = useState()
    const [experienceToEdit, setExperienceToEdit] = useState()
    const [experiences, setExperiences] = useState(() => [])

    useEffect(()=> {
        props.experienceStore.getForDeveloper(props.dev).then(experiences => {
            refreshExperiences(experiences)
        })
    }, [])


    function confirmDelete(experience){
        setExperienceToDelete(experience)
    }

    function refreshExperiences(experiences){
        setExperiences(experiences.sort((e1, e2) => {
            if ( e1.StartDate > e2.StartDate ){
                return -1;
              }
              if ( e1.StartDate < e2.StartDate ){
                return 1;
              }
              return 0;
        }))
    }

    function confirmEdit(experience){
        if(experience.id){
            props.experienceStore.update(experience).then(experienceUpdated => {
                const experiencesUpdated = [...experiences]
                experiencesUpdated[experiences.indexOf(experiences.find((e) => e.id == experience.id))] = experienceUpdated.result
                refreshExperiences(experiencesUpdated)
            })
        }
        else{
            props.experienceStore.add(props.dev, experience).then((result) => {
                if(result.success){
                    refreshExperiences([...experiences, result.result])
                }
            })
        }
        
        setExperienceToEdit(null)
    }

    function cancelDelete(){
        setExperienceToDelete(null)
    }

    function cancelEdit(){
        setExperienceToEdit(null)
    }

    function deleteExperience(){
        props.experienceStore.remove(experienceToDelete)
        setExperienceToDelete(null)
        const index = experiences.indexOf(experienceToDelete);
        if (index > -1) {
            experiences.splice(index, 1);
        }
        refreshExperiences([...experiences])
    }

    function startEditing(experience){
        setExperienceToEdit(experience)
    }

    function startAdding(){
        setExperienceToEdit(defaultExperience())
    }

    function next(){
        setChoice('next')
    }

    if(choice){
        return props.next()
    }

    return <>
        <Modal
            open={experienceToEdit ? true : false}
            onClose={cancelEdit} style={{
                width: "50%",
                height: "70%",
                margin: 'auto'
            }} 
            >
            <Paper style={{padding: 0}}>
                <ExperienceForm experience={experienceToEdit} onCancel={cancelEdit} onSubmit={(experience) => confirmEdit(experience)}/>
            </Paper>
        </Modal>
        <Dialog
            open={experienceToDelete ? true : false}
            onClose={cancelDelete}
            >
            <DialogTitle id="alert-dialog-title">Confirmer la suppression</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Voulez-vous vraiment supprimer l'expérience chez {experienceToDelete?.Entreprise} ?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={cancelDelete} color="primary">
                    Annuler
                </Button>
                <Button onClick={deleteExperience} color="primary" autoFocus>
                    Supprimer
                </Button>
            </DialogActions>
        </Dialog>
        <Paper style={{padding: 12, margin: 12}}>
            <h2>Vos expériences</h2>
            <Grid style={{padding: 30}} container spacing={6} justify='center'>
                {
                    experiences.length > 0 ?
                        experiences.map((experience) => <Grid item xs={3} key={Math.random().toString()}><ExperienceItem experience={experience} onDelete={confirmDelete} onEdit={startEditing} /></Grid>)
                        : <p>Vous n'avez pas saisi d'expérience pour le moment</p>
                }
            </Grid>
            <Container style={{margin: 'auto', textAlign: 'center'}}>
                <Button onClick={startAdding}>Ajouter une expérience</Button>
            </Container>
        </Paper>
        <Paper style={{padding: 12, margin: 12}}>
            <SkillsWidget {...props} />
        </Paper>
        <Paper style={{textAlign: 'center', margin: 12}}>
            <Button onClick={next}>Continuer</Button>
        </Paper>
    </>
}