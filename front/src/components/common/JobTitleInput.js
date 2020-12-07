import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';

export default function JobTitleInput(props) {
    return <Autocomplete
        disableClearable
        options={props.jobTitles}
        getOptionLabel={(jobTitle) => jobTitle?.Name ?? ''}
        style={{ width: 250 }}
        value={props.value ?? ''}
        onChange={(event, value) => props.onChange ? props.onChange(event, value) : null}
        renderInput={(params) => <TextField {...params} label={props.label} variant="outlined"
        />}
    />
}