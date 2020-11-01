import React, { useEffect, useState } from 'react';
import { Button, TextField, Snackbar, List, Paper, Container, Grid } from '@material-ui/core';
import { Rating, Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import SkillForm from './SkillForm';
import SkillItem from './SkillItem';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

export default (props) => {
    const [skills, setSkills] = useState([])
    const [skillTypes, setSkillTypes] = useState([])
    const [error, setError] = useState(undefined)
    const classes = useStyles();

    useEffect(() => {
        props.skillStore.getForDeveloper(props.dev).then((results) => setSkills(results))
        props.skillStore.getSkillTypes().then((results) => setSkillTypes(results))
    },  [])
    async function addSkill(skillTypeInput, skillLevelInput){
        if(skillTypeInput.length === 0){
            setError('Choisis une compétence')
            return
        }
        var skillType = null;
        skillTypes.forEach(s => {
            if(s.Name === skillTypeInput){
                skillType = s;
            }
        });
        if(skillType == null){
            skillType = (await props.skillStore.addSkillType(skillTypeInput)).result
        }
        var hasAlreadySkillType = false;
        skills.forEach(s => {
            if(s.Skill == skillType.id){
                hasAlreadySkillType = true
            }
        });

        if(!hasAlreadySkillType){
            const newSkill = (await props.skillStore.add(props.dev, {id: skillType.id}, skillLevelInput)).result
            setSkills([...skills, newSkill])
        }
        else{
            setError('Vous avez déjà saisis cette compétence')
        }
    }
    async function removeSkill(skill){
        const oldSkills = [...skills];
        props.skillStore.remove(props.dev, skill).then(result => {
            console.log(result.success)
                if(!result.success){
                    setSkills(oldSkills)
                }
            }
        )
        const index = skills.indexOf(skill);
        if (index > -1) {
            skills.splice(index, 1);
        }
        setSkills([...skills])
    }

    return <div className="page">
        <Snackbar open={error != undefined ? true : false} autoHideDuration={3000} onClose={() => setError(undefined)}>
            <Alert severity="error" onClose={() => setError(undefined)}>
                {error}
            </Alert>
        </Snackbar>
        <Grid container spacing={3} className={classes.root}>
            <Grid item xs={6}>
                <Paper>
                    <h2>Vos compétences</h2>
                    <SkillForm skillTypes={skillTypes} submit={addSkill} error={error} />
                    <List dense={true} style={{width: 300}}>
                        {skills.map((skill) =>
                        <SkillItem key={`${skill.id}-${skill.level}`} skill={skill} skillStore={props.skillStore} onRemove={removeSkill} />
                        )}
                    </List>
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper>
                    <h2>Form</h2>
                </Paper>
            </Grid>
        </Grid>
            
            
    </div>
}