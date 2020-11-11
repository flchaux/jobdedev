import React, { useEffect, useState } from 'react';
import { Container, Grid, MenuItem, Select, Snackbar, TextField, InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Rating, Alert } from '@material-ui/lab';

export default ({label, xs, ...props}) => {
    return <>
        <Grid item xs={xs/2} style={{textAlign:'right'}}>{label}</Grid>
        <Grid item xs={xs/2}><Rating {...props} /></Grid>
    </>
}