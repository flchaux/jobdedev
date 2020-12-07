import { Grid } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import RatingGridItem from '../../components/common/RatingGridItem';
import UserContext from '../../UserContext';

export default function PrioritiesWidget(props) {
    const dev = useContext(UserContext)
    const [priorityTypes, setPriorityTypes] = useState([])
    const [priorities, setPriorities] = useState([])
    const priorityManager = props.priorityManager

    useEffect(() => {
        priorityManager.fetchPriorityTypes().then((types) => {
            priorityManager.fetchPriorities().then((priorities) => {
                setPriorities(priorities)
                setPriorityTypes(types)
            });
        });

    }, [priorityManager])

    const updatePriority = function (type, rating) {
        if (!(type in dev.priorities)) {
            dev.priorities[type] = {
                Name: type
            }
        }

        dev.priorities[type].Rating = rating;
        if (props.onChange)
            props.onChange(this, dev.priorities)
    }

    return <div style={{ margin: 'auto', marginBottom: 32 }}>
        <p style={{ textAlign: 'center' }}>Mes priorités pour mon futur emploi</p>
        <Grid container spacing={4}>
            {priorityTypes.map((p) => <RatingGridItem
                key={p.Name} label={p.Label}
                xs={12}
                sm={6}
                onChange={(event, value) => updatePriority(event.target.name, value)}
                name={p.Name}
                defaultValue={priorities[p.Name]?.Rating} />)}
        </Grid>
    </div>
}