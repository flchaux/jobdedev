
import React, { useEffect, useState } from 'react';
import {  IconButton, Grid, Paper, Box } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import moment from 'moment'

export default ({experience, ...props}) => {

    const ellipsisStyle = {
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',  
    }
    return <Paper>
            <Grid container spacing={2} style={{padding: 16}}>
                <Grid item xs={6} style={{textAlign: 'center'}}>{moment(experience.StartDate).format('MM/YYYY')}</Grid>
                <Grid item xs={6} style={{textAlign: 'center'}}>{experience.EndDate ? moment(experience.EndDate).format('MM/YYYY') :  'Maintenant'}</Grid>
                <Grid item xs={12}><b>{experience.Job}</b></Grid>
                <Grid item xs={12}>{experience.Entreprise}</Grid> 
                <Grid item xs={12}>
                    <Box component="div" style={ellipsisStyle} >{experience.Description}</Box>
                </Grid>
                {props.readonly ? <></> : <>
                    <Grid item xs={12} style={{textAlign:"end"}}>
                        <IconButton color="primary" component="span" onClick={() => props.onDelete(experience)}>
                            <DeleteIcon />
                        </IconButton>
                        <IconButton color="primary" component="span" onClick={() => props.onEdit(experience)}>
                            <EditIcon />
                        </IconButton>
                    </Grid>
                </>}
               
            </Grid>
        </Paper>
}