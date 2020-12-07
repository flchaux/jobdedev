import { InputAdornment, MenuItem, Select, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

export default function WageInput(props) {
    const [wage, setWage] = useState(props.wage ?? {
        value: 0,
        computing: "Annualy"
    })
    useEffect(() => {
        props.onChange(this, wage)
    }, [props, wage])
    return <>
        <TextField type="number"
            inputProps={{
                step: 1000,
                min: 0,
            }}
            value={wage.value}
            InputProps={{
                endAdornment: <InputAdornment position="end">€</InputAdornment>,
            }}
            onChange={(event, value) => {
                setWage({
                    value: parseInt(event.target.value),
                    computing: wage.computing
                })
            }
            }  ></TextField>
        <Select defaultValue={wage.computing} onChange={(event, value) => setWage({
            value: wage.value,
            computing: event.target.value
        })} style={{ marginLeft: 8 }}>
            <MenuItem value="Monthly">Mensuel</MenuItem>
            <MenuItem value="Annualy">Annuel</MenuItem>
        </Select>
    </>
}