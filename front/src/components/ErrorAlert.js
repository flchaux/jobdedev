import React, { useEffect, useState } from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

export default (props) => {
    return <Snackbar open={props.error != undefined ? true : false} autoHideDuration={3000} onClose={() => props.setError(undefined)}>
            <Alert severity="error" onClose={() => props.setError(undefined)}>
                {props.error}
            </Alert>
        </Snackbar>
}