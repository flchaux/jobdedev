import { Button, Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import moment from 'moment'

export default function AgentChoiceFrame(props) {
    const agent = props.agent
    const style = {
        padding: 20,
        textAlign: "center"
    }
    const [availabitity, setAvailabitity] = useState(null)
    useEffect(() => {
        props.calendar.fetchAvailabilities(agent, moment(), moment().add(1, 'weeks')).then((busySlot) => {
            // max 35h by week
            var availabilities = 35
            busySlot.forEach(slot => availabilities -= moment.duration(moment(slot.end).diff(moment(slot.start))).asHours())
            setAvailabitity(`${availabilities} créneaux disponibles dans la semaine à venir`)
        })
    }, [setAvailabitity, agent, props.calendar])
    return <Paper style={style}>
        <h3>{agent.Name}</h3>
        <img src={agent.Picture[0].url} alt="Agent" width={200} />
        <p>
            {agent.Description.split('\n').map((item, key) => <span key={key}>{item}<br /></span>)}
        </p>
        <h4>{availabitity ? availabitity : 'Chargement des disponbilités...'}</h4>
        <Button onClick={() => props.change(agent)}>Choisir</Button>
    </Paper>
}