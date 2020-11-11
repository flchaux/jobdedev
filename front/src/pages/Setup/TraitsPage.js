import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

export default (props) => {
    const [choice, setChoice] = useState()
    const [traits, setTraits] = useState([])
    const [selectedTraits, setSelectedTraits] = useState([])

    if(choice == 'profile'){
        return props.next()
    }

    useEffect(() => {
        props.traitStore.getAll().then(allTraits => {
            props.traitStore.getForDeveloper(props.dev).then(selectedTraits => {
                // shuffling
                setTraits(allTraits.sort((t) => Math.floor(Math.floor(Math.random() * Math.floor(2))) % 2 === 0 ? 1 : -1))
                setSelectedTraits(selectedTraits)
            })
        })
    }, [])

    function validate(){
        props.devStore.updateTraits(props.dev, selectedTraits)
        setChoice('validate')
    }

    if(choice){
        return props.next()
    }


    function handleTraitChange(event){
        const traitId = (event.target.name.split('-'))[1]
        const newSelectedTraits = [...selectedTraits ]
        const existing = selectedTraits.find((t) => t.Id == traitId)
        if(event.target.checked && !existing){
            newSelectedTraits.push(traits.find(t => t.Id == traitId))
        }
        else if(!event.target.checked && existing){
            newSelectedTraits.splice(selectedTraits.indexOf(existing), 1)
        }
        setSelectedTraits(newSelectedTraits)
    }

    return <Paper style={{padding: 16}}>
        <h2>Mes traits de personnalité</h2>
        <p>Dernière étape ! Ces informations restent entre nous mais nous permettent de mieux cibler vos attentes concernant votre environnement.</p>
        <FormControl>
            <FormLabel>Au travail je suis plutôt (5 choix possibles) : </FormLabel>
            <FormGroup>
            <Grid container spacing={4} style={{width: '70%', margin: 'auto'}}>
                {traits.map(t => <Grid key={t.Id} item xs={3}>
                    <FormControlLabel
                        control={<Checkbox disabled={selectedTraits.length >= 5 && !selectedTraits.find(s => s.Id == t.Id)} checked={selectedTraits.find(s => s.Id == t.Id) ? true : false} onChange={handleTraitChange} name={'trait-'+t.Id} />}
                        label={t.Name}
                    />
                    </Grid>
                )}
                </Grid>
            </FormGroup>
        </FormControl>
        <div style={{textAlign: 'center'}}>
            <Button onClick={validate}>Valider</Button>
        </div>
    </Paper>
}