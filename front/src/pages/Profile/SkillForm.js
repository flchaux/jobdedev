import { Button, Grid, TextField } from '@material-ui/core';
import { Autocomplete, Rating } from '@material-ui/lab';
import React, { useState } from 'react';


export default (props) => {
    const [skillType, setSkillType] = useState('')
    const [skillLevel, setSkillLevel] = useState(2)

    return <form>
        <Grid container justify="center" alignItems="center" spacing={4}>
            <Grid item>
                <Autocomplete
                    options={props.skillTypes}
                    getOptionLabel={(option) => option.Name}
                    inputValue={skillType}
                    onInputChange={(event, value) => setSkillType(value)}
                    style={{ width: 250 }}
                    freeSolo={true}
                    renderInput={(params) => <TextField {...params} label="Choisis une compétence" variant="outlined" />}
                />
            </Grid>
            <Grid item>
                <Rating
                    name="rating"
                    value={skillLevel}
                    precision={0.5}
                    onChange={(event, newValue) => {
                        setSkillLevel(newValue);
                    }}
                    />
            </Grid>
            <Grid item>
                <Button onClick={() => props.submit(skillType, skillLevel)}>Add Skill</Button>
            </Grid>
        </Grid>
        
    </form>
}