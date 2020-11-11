import { Button, Grid, Paper, TextField, IconButton } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import {  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import React, { useEffect, useState, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import ExperienceItem from './ExperienceItem';
import AddIcon from '@material-ui/icons/Add'
import moment from 'moment';
import ExperienceForm from './ExperienceForm';

export default (props) => {
    const defaultExperience = () => {
        return {  
            StartDate: '',
            EndDate: '',
            Entreprise: '',
            Job: '',
            Description: '',
        }
    }
    const [choice, setChoice] = useState()
    const [experienceToDelete, setExperienceToDelete] = useState()
    const [experienceToEdit, setExperienceToEdit] = useState()
    const [experiences, setExperiences] = useState(() => [])
    const [newExperience, setNewExperience] = useState(defaultExperience())

    if(choice == ''){
    }

    useEffect(()=> {
        props.experienceStore.getForDeveloper(props.dev).then(experiences => {
            setExperiences(experiences)
        })
    }, [])


    function confirmDelete(experience){
        setExperienceToDelete(experience)
    }
    function confirmEdit(experience){
        props.experienceStore.update(experience).then(experienceUpdated => {
            const experiencesUpdated = [...experiences]
            console.log(experienceUpdated)
            experiencesUpdated[experiences.indexOf(experiences.find((e) => e.id == experience.id))] = experienceUpdated.result
            setExperiences(experiencesUpdated)
        })
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
        setExperiences([...experiences])
    }

    function startEditing(experience){
        setExperienceToEdit(experience)
    }

    function add(){
        props.experienceStore.add(props.dev, newExperience).then((experience) => {
            setExperiences([...experiences, experience.result])
        })
        setNewExperience(defaultExperience())
    }

    function newValueInputChange(event){
        const value = {...newExperience }
        value[event.target.name] = event.target.value
        setNewExperience(value)
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
                <Paper style={{
                padding: 40,}}>
                    <ExperienceForm experience={experienceToEdit} onSubmit={(experience) => confirmEdit(experience)}/>
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
        <Paper>
            <p>Saisissez vos expériences : </p>
            <Grid style={{padding: 30}} container spacing={6}>
                {experiences.map((experience) => <Grid item xs={3} key={Math.random().toString()}><ExperienceItem experience={experience} onDelete={confirmDelete} onEdit={startEditing} /></Grid>)}
                <Grid item xs={2}>
                    <TextField name='StartDate' placeholder="Date de début" type="date" value={newExperience.StartDate} onChange={newValueInputChange} />
                </Grid>
                <Grid item xs={2}>
                    <TextField name='EndDate' placeholder="Date de fin" type="date" value={newExperience.EndDate} onChange={newValueInputChange} />
                </Grid>
                <Grid item xs={2}>
                    <TextField name='Entreprise' placeholder="Entreprise" value={newExperience.Entreprise} onChange={newValueInputChange} />
                </Grid>
                <Grid item xs={2}>
                    <TextField name='Job' placeholder="Nom du poste" value={newExperience.Job} onChange={newValueInputChange} />
                </Grid>
                <Grid item xs={2}>
                    <TextField name='Description' placeholder="Missions et description" value={newExperience.Description} onChange={newValueInputChange} />
                </Grid>
                <Grid item xs={2}>
                    <IconButton color="primary" component="span" onClick={() => add()}>
                        <AddIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </Paper>
    </>
}