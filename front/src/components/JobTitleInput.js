import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

export default (props) => {
    return <Autocomplete
            options={props.jobTitles}
            getOptionLabel={(jobTitle) => jobTitle?.Name ?? ''}
            style={{ width: 250 }}
            value={props.value ?? ''}
            onChange={(event, value) => props.onChange ? props.onChange(event, value) : null}
            renderInput={(params) => <TextField {...params} label={props.label} variant="outlined" 
            />} 
        />
}