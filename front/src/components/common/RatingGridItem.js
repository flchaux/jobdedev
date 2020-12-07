import { Grid } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import React from 'react';

export default function RatingGridItem({ label, xs, sm, ...props }) {
    return <>
        <Grid item xs={xs / 2} sm={sm / 2} style={{ textAlign: 'right' }}>{label}</Grid>
        <Grid item xs={xs / 2} sm={sm / 2}><Rating {...props} /></Grid>
    </>
}