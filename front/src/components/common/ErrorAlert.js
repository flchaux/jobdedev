import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useState } from 'react';

export default function ErrorAlert(props) {
    const [error, setError] = useState()
    props.errorManager.setError = setError
    return <Snackbar open={error ? true : false} autoHideDuration={3000} onClose={() => setError(undefined)}>
        <Alert severity="error" onClose={() => setError(undefined)}>
            {error}
        </Alert>
    </Snackbar>
}