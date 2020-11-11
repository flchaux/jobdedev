import { Grid, List, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import SkillManager from '../../business/SkillManager';
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
    const classes = useStyles();
    const [skillManager, setSkillManager] = useState(() => SkillManager(props.skillStore, props.dev))
    useEffect(() => {
        skillManager.fetchSkillTypes().then((results) => setSkillTypes(results))
        skillManager.fetchSkills().then((results) => setSkills(results))
    },  [])

    function addSkill(skillType, skillLevel){
        skillManager.addSkill(skillType, skillLevel).then((newSkills) => { 
            setSkills([...newSkills])
        }).catch((e) => props.errorManager.setError(e));
    }
    
    function removeSkill(skill){
        skillManager.removeSkill(skill).then((newSkills) => setSkills([...newSkills])).catch((e) => props.errorManager.setError(e));
    }

    return <div className="page">
        <Grid container spacing={3} className={classes.root}>
            <Grid item xs={6}>
                <Paper>
                    <h2>Vos compétences</h2>
                    <SkillForm skillTypes={skillTypes} submit={addSkill} />
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