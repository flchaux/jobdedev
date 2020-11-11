import React, { useEffect, useState } from 'react';
import { Container, Grid, MenuItem, Select, Snackbar, TextField, InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export default (props) => {
    const [wage, setWage] = useState(props.wage ?? {
        value: 0,
        computing: "Annualy"
    })
    useEffect(()=> {
        props.onChange(this, wage)
    }, [wage])
    return <>
            <TextField value={props.value}
                type="number"
                inputProps={{step: 1000}}
                value={wage.value}
                InputProps={{
                    endAdornment: <InputAdornment position="end">€</InputAdornment>,
                }} onChange={(event, value) => {
                    setWage({
                        value: parseInt(event.target.value),
                        computing: wage.computing
                    })}
                }  ></TextField>
            <Select defaultValue={wage.computing} onChange={(event, value) => setWage({
                value: wage.value,
                computing: event.target.value
            })} defaultValue="Annualy" style={{marginLeft:8} }>
                <MenuItem  value="Monthly">Mensuel</MenuItem>
                <MenuItem  value="Annualy">Annuel</MenuItem>
            </Select>
        </>
}