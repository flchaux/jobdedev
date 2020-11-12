import React, { useEffect, useState } from 'react';
import Menu from '../Menu';
import Colors from '../Theme';
import { Grid } from '@material-ui/core';

export default (props) => {
    return <Grid direction="row" container>
        <Grid item xs={2}>
        <Menu style={{
            listStyle: "none",
            backgroundColor: Colors.light,
            padding: 20,
            margin: 0
        }} />
        </Grid>
        <Grid item xs={10}>
        {props.children}
        </Grid>
    </Grid>
}