import { Avatar, Card, Grid, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';
import Colors from '../../Theme';


export default function SkillWishItem(props) {
    console.log(props.skill)
    return <Card style={{ padding: 8, backgroundColor: Colors.neutral, color: Colors.primary, margin: 'auto' }}><Grid container spacing={2} justify='center' alignItems='center'>
        <Grid item>
            <Avatar src={props.skill.Icon[0].url}>
            </Avatar>
        </Grid>
        <Grid item>
            <Grid container direction='column' spacing={1}>
                <Grid item>{props.skill.Name}</Grid>
            </Grid>
        </Grid>
        <Grid item>
            <IconButton onClick={() => props.onRemove(props.skill)} edge="end" aria-label="delete">
                <DeleteIcon />
            </IconButton>
        </Grid>
    </Grid></Card>
}