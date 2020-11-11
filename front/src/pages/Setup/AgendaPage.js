import React, { useEffect, useState } from 'react';
import { Button, TextField, Snackbar, List, Paper, Container, Grid } from '@material-ui/core';
import { Rating, Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import frLocale from '@fullcalendar/core/locales/fr'; 
import interactionPlugin from '@fullcalendar/interaction';
import moment from 'moment'

export default (props) => {
    const [choice, setChoice] = useState()
    var selectedSlot = null
    function slotSelected(info){
        selectedSlot = info.date
    }

    function validate(){
        if(selectedSlot){
            props.calendar.createEvent(selectedSlot).then((result) => {
                if(result.success){
                    setChoice(true)
                }
            })
        }
        else{
            props.errorManager.setError('Veuillez choisir un créneau dans le calendrier')
        }
    }

    if(choice){
        return props.next()
    }
    const googleApiKey = 'AIzaSyCxkt0pE7d9Fym9QB1M7uiF66ApoS2krLA'
    return <Paper style={{width: 600, padding: 20, margin: 'auto'}}>
        <h2>Planifier un rendez-vous téléphonique avec votre agent</h2>
        <div style={{margin: 30}}>
            <FullCalendar
                plugins={[ timeGridPlugin, googleCalendarPlugin, interactionPlugin ]}
                initialView="timeGridWeek"
                weekends={false}
                selectable={true}
                selectOverlap={false}
                eventDisplay="background"
                googleCalendarApiKey={googleApiKey}
                slotDuration="01:00:00"
                slotMaxTime="18:00:00"
                slotMinTime="09:00:00"
                unselectAuto={false}
                selectMirror={true}
                selectAllow={(info) => {
                    if(moment(info.start) < moment()){
                        return false
                    }
                    if(info.end.getHours() - info.start.getHours() >= 2){
                        return false
                    }
                    return true
                }}
                locale={frLocale}
                selectable={true}
                expandRows={true}
                dateClick={slotSelected}
                allDaySlot={false}
                eventContent={(info) => {
                    if(info.isMirror)
                        return 'Votre rendez-vous'
                    return 'Occupé'
                }}
                events={{googleCalendarId: props.dev.agent.Calendar}}
            />
        </div>
        <div style={{textAlign: 'center'}}>
            <Button onClick={validate}>Choisir ce créneau</Button>
        </div>
    </Paper>
}