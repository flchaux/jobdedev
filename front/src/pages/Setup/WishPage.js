import { Button, Container, Grid, Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import WageInput from '../../components/WageInput';
import JobTitleInput from '../../components/JobTitleInput';
import { makeStyles } from '@material-ui/core/styles';
import RatingGridItem from '../../components/RatingGridItem';
import PriorityManager from '../../business/PriorityManager';

export default (props) => {
    const [choice, setChoice] = useState()


    const [jobTitles, setJobTitles] = useState([])
    const [priorityTypes, setPriorityTypes] = useState([])
    const [priorities, setPriorities] = useState([])
    const [dev, setDev] = useState(() => props.dev)
    const [priorityManager, setPriorityManager] = useState(() => PriorityManager(props.priorityStore, dev))
    

    function getDefaultWage(wage){
        return {
            value: wage.value ?? 0,
            computing: wage.computing ?? 0,
        }
    }
    function getDefaultJob(currentJobTitles, wage){
        return {
            jobTitle: currentJobTitles.length > 0 && jobTitles.length > 0 ? jobTitles.find((j) => j.id == currentJobTitles[0]) : '',
            wage: getDefaultWage(wage)
        }
    }

    const wish = {
        required: getDefaultJob(dev.JobTitleRequired, 
            {
                value: dev.AnnualWageRequired,
                computing: dev.AnnualWageRequiredComputing
            }),
        optional: getDefaultJob(dev.JobTitleOptional, 
            {
                value: dev.AnnualWageOptional,
                computing: dev.AnnualWageOptionalComputing
            }),
        priorities: {}
    }
    
    useEffect(()=> {
        props.jobTitleStore.getAll().then((result) => {

            setJobTitles(result)
        });
        priorityManager.fetchPriorityTypes().then((types) => {
            priorityManager.fetchPriorities().then((priorities) => {
                setPriorities(priorities)
                setPriorityTypes(types)
            });
        });
        
    }, [])

    const useStyles = makeStyles({
        labelCell: {
          textAlign: 'right',
          verticalAlign: 'center',
            margin: 'auto'
        },
        valueCell: {
          textAlign: 'left',
          verticalAlign: 'center',
        },
      });
 
    const classes = useStyles();

    const validate = function(){
        if(wish.required.jobTitle && wish.required.wage.value > 0 && 
            wish.optional.jobTitle && wish.optional.wage.value > 0)
        {
            priorityManager.updateAll()
            props.devStore.updateWish(dev, wish)
            setChoice('validate')
        }
        else
            props.errorManager.setError('Tous les champs du formulaire sont obligatoires')
    }

    const updatePriority = function(type, rating){
        if(!(type in dev.priorities)){
            dev.priorities[type] = {
                Name: type
            }
        }

        dev.priorities[type].Rating = rating;
    }
    if(choice == 'validate'){
        return props.next()
    }

    return <Paper style={{padding:32}}>
        <h2>Vos attentes</h2>
        <p>On est avant tout là pour vous aider à obtenir le meilleur pour vous et ça commence évidemment par le poste, le salaire et les attentes légitimes que vous pouvez avoir.</p>
        <Grid container spacing={8} alignContent='center' style={{marginBottom: 32}}>  
            <Grid item sm={6} className={classes.labelCell}>
                Je recherche avant tout un poste de 
            </Grid>
            <Grid item sm={6} className={classes.valueCell}>
                <JobTitleInput jobTitles={jobTitles} onChange={(event, value) => {
                    wish.required.jobTitle = value
                 } } value={wish.required.jobTitle} />
            </Grid>
            <Grid item sm={6} className={classes.labelCell}>
                Dans ce cas je souhaite gagner au moins
            </Grid>
            <Grid item sm={6} className={classes.valueCell}>
                <WageInput onChange={(input, wage) => {wish.required.wage = wage}} value={ dev.AnnualWageRequired.length} wage={{value: dev.AnnualWageRequired, computing: dev.AnnualWageRequiredComputing }} />
            </Grid>
            <Grid item sm={6} className={classes.labelCell}>
                Je recherche avant tout un poste de
            </Grid>
            <Grid item sm={6} className={classes.valueCell}>
                <JobTitleInput jobTitles={jobTitles} onChange={(event, value) => wish.optional.jobTitle = value } value={wish.optional.jobTitle} />
            </Grid>
            <Grid item sm={6} className={classes.labelCell}>
                En gagnant minimum 
            </Grid>
            <Grid item sm={6} className={classes.valueCell}>
                <WageInput onChange={(input, wage) => {wish.optional.wage = wage}} wage={{value: dev.AnnualWageOptional, computing: dev.AnnualWageOptionalComputing }} />
            </Grid>
        </Grid>
        <div style={{margin: 'auto', marginBottom: 32}}>
            <p style={{textAlign: 'center'}}>Mes priorités pour mon futur emploi</p>
            <Grid container spacing={4}>
                {priorityTypes.map((p) => <RatingGridItem 
                key={p.Name} label={p.Label} 
                xs={6}
                onChange={(event, value) => updatePriority(event.target.name, value)} 
                name={p.Name} 
                defaultValue={priorities[p.Name]?.Rating} />)}
            </Grid>
        </div>
        <Container>
            <Button onClick={validate} style={{margin: 'auto', display: 'block'}}>Continuer</Button> 
        </Container>
    </Paper>
}