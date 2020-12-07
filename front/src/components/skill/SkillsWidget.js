import { Grid } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import SkillManager from '../../business/SkillManager';
import UserContext from '../../UserContext';
import SkillForm from './SkillForm';
import SkillItem from './SkillItem';

/*const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));*/

export default function SkillWidget(props) {
    const dev = useContext(UserContext)
    const [skills, setSkills] = useState([])
    const [skillTypes, setSkillTypes] = useState([])
    const [skillManager] = useState(() => SkillManager(props.skillStore, props.skillTypeStore, dev))
    useEffect(() => {
        skillManager.fetchSkillTypes().then((results) => setSkillTypes(results))
        skillManager.fetchSkills().then((results) => setSkills(results))
    }, [skillManager])

    function addSkill(skillType, skillLevel) {
        skillManager.addSkill(skillType, skillLevel).then((newSkills) => {
            setSkills([...newSkills])
        }).catch((e) => props.errorManager.setError(e));
    }

    function removeSkill(skill) {
        skillManager.removeSkill(skill).then((newSkills) => setSkills([...newSkills])).catch((e) => props.errorManager.setError(e));
    }

    return <div>
        <h2>Vos compétences</h2>
        <div style={{ padding: 16 }}>
            <Grid container spacing={4} direction='column' style={{ margin: 'auto', textAlign: 'center' }}>
                <Grid item>
                    <SkillForm useLevel skillTypes={skillTypes} submit={addSkill} />
                </Grid>
                <Grid item style={{ padding: 16 }}>
                    {skills.length > 0 ?
                        <Grid container spacing={4} justify='center'>
                            {skills.map((skill) => <Grid item container xs={12} sm={6} md={4} lg={3} key={`${skill.id}-${skill.level}`} >
                                <SkillItem skill={skill} skillStore={props.skillStore} onRemove={removeSkill} />
                            </Grid>
                            )}
                        </Grid>
                        : <p>Vous n'avez pas saisi de compétence pour le moment</p>}
                </Grid>
            </Grid>
        </div>
    </div>
}