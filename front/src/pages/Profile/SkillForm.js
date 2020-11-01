import React, { useEffect, useState } from 'react';
import { Rating, Autocomplete, Alert } from '@material-ui/lab';
import { Button, TextField, Grid,  } from '@material-ui/core';


export default (props) => {
    const [skillType, setSkillType] = useState('')
    const [skillLevel, setSkillLevel] = useState(2)

    return <form>
        <Grid container justify="center" alignItems="center" spacing={4}>
            <Autocomplete
                options={props.skillTypes}
                getOptionLabel={(option) => option.Name}
                inputValue={skillType}
                onInputChange={(event, value) => setSkillType(value)}
                style={{ width: 250 }}
                freeSolo={true}
                renderInput={(params) => <TextField {...params} label="Choisis une compétence" variant="outlined" />}
            />
            <Rating
                name="rating"
                value={skillLevel}
                precision={0.5}
                onChange={(event, newValue) => {
                    setSkillLevel(newValue);
                }}
                />
            <Button onClick={() => props.submit(skillType, skillLevel)}>Add Skill</Button>
        </Grid>
        
    </form>
}