import { Grid } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import SkillManager from '../../business/SkillManager';
import UserContext from '../../UserContext';
import SkillForm from '../skill/SkillForm';
import SkillWishItem from './SkillWishItem';

export default function SkillWishWidget(props) {
    const dev = useContext(UserContext)
    const [stack, setStack] = useState(dev.Stack)
    const [stackSkills, setStackSkills] = useState([])
    const [skillTypes, setSkillTypes] = useState([])
    const [skillManager] = useState(() => SkillManager(props.skillStore, props.skillTypeStore, dev))

    useEffect(() => {
        skillManager.fetchSkillTypes().then((results) => {
            setSkillTypes(results)
        })
    }, [skillManager, dev])

    useEffect((() => {
        if (stack.length && skillTypes.length) {
            setStackSkills(stack.map((s) => skillTypes.find(t => t.id === s)))
        }
    }), [stack, skillTypes, dev])

    function addSkill(skillName) {
        if (!skillName || !skillName.length) {
            props.errorManager.setError('Veuillez saisir une compétence')
            return
        }
        skillManager.fetchOrAddSkillType(skillName).then(skillType => {
            if (stack.find(id => skillType.id === id)) {
                props.errorManager.setError(`Vous avez déjà ajouté la compétence ${skillType.Name}`)
                return
            }
            props.devStore.addStack(dev, skillType).then((newStack) => {
                setStack([...newStack])
            }).catch((e) => props.errorManager.setError(e));
        })
    }

    function removeSkill(skill) {
        props.devStore.removeStack(dev, skill).then((newStack) => setStack([...newStack])).catch((e) => props.errorManager.setError(e));
    }

    return <div>
        <h3>Sur quelle stack souhaitez vous travailler ?</h3>
        <div style={{ padding: 16 }}>
            <Grid container spacing={4} direction='column' style={{ margin: 'auto', textAlign: 'center' }}>
                <Grid item>
                    <SkillForm skillTypes={skillTypes} submit={addSkill} />
                </Grid>
                <Grid item style={{ padding: 16 }}>
                    {stackSkills.length > 0 ?
                        <Grid container spacing={4} justify='center'>
                            {stackSkills.map((skill) => <Grid item container xs={12} sm={6} md={4} lg={3} key={`${skill.id}`} >
                                <SkillWishItem skill={skill} onRemove={removeSkill} />
                            </Grid>
                            )}
                        </Grid>
                        : <p>Vous n'avez pas saisi de stack pour le moment</p>}
                </Grid>
            </Grid>
        </div>
    </div>
}