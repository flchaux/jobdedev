
import React, { useEffect, useState } from 'react';
import {  IconButton, Grid, Paper, Box } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

export default ({experience, ...props}) => {

    const ellipsisStyle = {
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',  
    }
    // style={{whiteSpace: 'nowrap'}}
    //textOverflow="ellipsis" overflow="hidden"
    return <Paper>
            <Grid container spacing={2} style={{padding: 16}}>
                <Grid item xs={6} style={{textAlign: 'center'}}>{experience.StartDate}</Grid>
                <Grid item xs={6} style={{textAlign: 'center'}}>{experience.EndDate}</Grid>
                <Grid item xs={12}><b>{experience.Job}</b></Grid>
                <Grid item xs={12}>{experience.Entreprise}</Grid> 
                <Grid item xs={12}>
                    <Box component="div" style={ellipsisStyle} >{experience.Description}</Box>
                </Grid>
                <Grid item xs={10}></Grid>
                {props.readonly ? <></> : <>
                    <Grid item>
                        <IconButton color="primary" component="span" onClick={() => props.onDelete(experience)}>
                            <DeleteIcon />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton color="primary" component="span" onClick={() => props.onEdit(experience)}>
                            <EditIcon />
                        </IconButton>
                    </Grid
                ></>}
               
            </Grid>
        </Paper>
}