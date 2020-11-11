import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Rating } from '@material-ui/lab';
import React, { useState } from 'react';


export default (props) => {
    const [level, setLevel] = useState(props.skill.Level)
    async function updateLevel( newLevel){
        props.skill.Level = Number(newLevel)
        props.skillStore.updateLevel(props.skill)
        setLevel(props.skill.Level)
    }

    return <ListItem>
        <ListItemAvatar>
        <Avatar>
        </Avatar>
        </ListItemAvatar>
        <ListItemText
            primary={props.skill.SkillName}
            secondary={<Rating
                name={`rating${props.skill.SkillName}`}
                value={level}
                onChange={(e) => updateLevel(e.target.value)}
                />}
            />
        <ListItemSecondaryAction>
        <IconButton onClick={() => props.onRemove(props.skill)} edge="end" aria-label="delete">
            <DeleteIcon />
        </IconButton>
        </ListItemSecondaryAction>
    </ListItem>
}