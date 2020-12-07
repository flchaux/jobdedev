import { Avatar, Card, Grid, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Rating } from '@material-ui/lab';
import React, { useState } from 'react';
import Colors from '../../Theme';


export default function SkillItem(props) {
    const [level, setLevel] = useState(props.skill.Level)
    async function updateLevel(newLevel) {
        props.skill.Level = Number(newLevel)
        props.skillStore.updateLevel(props.skill)
        setLevel(props.skill.Level)
    }
    return <Card style={{ padding: 8, backgroundColor: Colors.neutral, color: Colors.primary, margin: 'auto' }}><Grid container spacing={2} justify='center' alignItems='center'>
        <Grid item>
            <Avatar src={props.skill.SkillIcon[0].url}>
            </Avatar>
        </Grid>
        <Grid item>
            <Grid container direction='column' spacing={1}>
                <Grid item>{props.skill.SkillName}</Grid>
                <Grid item>
                    <Rating
                        name={`rating${props.skill.SkillName}`}
                        value={level}
                        onChange={(e) => updateLevel(e.target.value)}
                    />
                </Grid>
            </Grid>
        </Grid>
        <Grid item>
            <IconButton onClick={() => props.onRemove(props.skill)} edge="end" aria-label="delete">
                <DeleteIcon />
            </IconButton>
        </Grid>
    </Grid></Card>
}