import React, { useContext, useState } from 'react';
import { Button, Paper } from '@material-ui/core';
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import frLocale from '@fullcalendar/core/locales/fr';
import interactionPlugin from '@fullcalendar/interaction';
import moment from 'moment'
import UserContext from '../../UserContext';

export default function AgendaWidget(props) {
    const dev = useContext(UserContext)

    const [choice, setChoice] = useState()
    var selectedSlot = null
    function slotSelected(info) {
        selectedSlot = info.date
    }

    function validate() {
        if (selectedSlot) {
            props.eventStore.add(dev, {
                Date: selectedSlot,
                Reason: props.reason
            }).then((result) => {
                if (result.success) {
                    props.calendar.createEvent(selectedSlot).then((result) => {
                        if (props.onPlanned)
                            props.onPlanned(selectedSlot)
                        if (result.success || process.env.NODE_ENV === 'development') {
                            setChoice(true)
                        }
                    })
                }
            })
        }
        else {
            props.errorManager.setError('Veuillez choisir un créneau dans le calendrier')
        }
    }

    if (choice) {
        return props.next()
    }
    // if sunday or saturday, start next week
    const firstAvailableDay = (moment().day() === 0 ? moment().add(1, 'days') : (moment().day() === 6 ? moment().add(2, 'days') : moment()))
    console.log(firstAvailableDay.format('YYYY-MM-DD'))

    const googleApiKey = 'AIzaSyCxkt0pE7d9Fym9QB1M7uiF66ApoS2krLA'
    return <Paper style={{
        maxWidth: 600, padding: 20, margin: 'auto'
    }}>
        <h2>Planifier un rendez-vous téléphonique avec votre agent</h2>
        <div style={{ margin: 30 }}>
            <FullCalendar
                plugins={[timeGridPlugin, googleCalendarPlugin, interactionPlugin]}
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
                    if (moment(info.start) < moment()) {
                        return false
                    }
                    if (info.end.getHours() - info.start.getHours() >= 2) {
                        return false
                    }
                    return true
                }}
                locale={frLocale}
                expandRows={true}
                dateClick={slotSelected}
                allDaySlot={false}
                eventContent={(info) => {
                    if (info.isMirror)
                        return 'Votre rendez-vous'
                    return 'Occupé'
                }}
                validRange={{ start: firstAvailableDay.format('YYYY-MM-DD') }}
                initialDate={firstAvailableDay.format('YYYY-MM-DD')}
                events={{ googleCalendarId: dev.agent.Calendar }}
            />
        </div>
        <div style={{ textAlign: 'center' }}>
            <Button onClick={validate}>Choisir ce créneau</Button>
        </div>
    </Paper >
}