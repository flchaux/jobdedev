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

export default (props) => {
    const [choice, setChoice] = useState()
    if(choice == 'call'){
    }

    function slotSelected(info){

    }

    const googleApiKey = 'AIzaSyCxkt0pE7d9Fym9QB1M7uiF66ApoS2krLA'
    return <Paper style={{width: 600}}>
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
            locale={frLocale}
            expandRows={true}
            dateClick={slotSelected}
            allDaySlot={false}
            eventContent={() => 'Occupé'}
            events={{googleCalendarId: props.dev.agent.Calendar}}
        />
    </Paper>
}