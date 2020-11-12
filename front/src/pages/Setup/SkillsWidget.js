import { Grid, List, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import SkillManager from '../../business/SkillManager';
import SkillForm from '../Profile/SkillForm';
import SkillItem from '../Profile/SkillItem';

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

    return <div>
        <h2>Vos compétences</h2>
        <Grid container spacing={4} direction='column' style={{margin: 'auto', textAlign: 'center'}}>
            <Grid item>
                <SkillForm skillTypes={skillTypes} submit={addSkill} />
            </Grid>
            <Grid item>
                {skills.length > 0 ? 
                    <Grid container spacing={4} justify='center'>
                        {skills.map((skill) => <Grid item container xs={2} sm={3} key={`${skill.id}-${skill.level}`} >
                                <SkillItem skill={skill} skillStore={props.skillStore} onRemove={removeSkill} />
                            </Grid>
                        )}
                    </Grid>
                : <p>Vous n'avez pas saisi de compétence pour le moment</p>}
             </Grid>
        </Grid>
    </div>
}