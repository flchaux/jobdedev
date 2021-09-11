import axios from 'axios';

export default function CalendarManager(dataLayer) {
    function createEvent(startDate) {
        return dataLayer.createEvent(startDate)
    }
    async function fetchAvailabilities(agent, from, to) {
        const apiKey = process.env.REACT_APP_GOOGLE_API_KEY
        const response = await axios.post('https://www.googleapis.com/calendar/v3/freeBusy?key=' + apiKey, {
            "timeMin": from.format(),
            "timeMax": to.format(),
            "items": [
                {
                    "id": agent.Calendar
                }
            ]
        });
        return response.data.calendars[agent.Calendar].busy
    }
    return {
        createEvent,
        fetchAvailabilities
    }
}
/*
function init(apiKey, clientId){
    var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
    var SCOPES = "https://www.googleapis.com/auth/calendar.events";
    gapi.client.init({
        apiKey: apiKey,
        clientId: clientId,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    }, function(error) {
        appendPre(JSON.stringify(error, null, 2));
    });
}

 function create(event) {
      var request = gapi.client.calendar.events.insert({
        'calendarId': 'primary',
        'resource': event
      });

      request.execute(function(event) {
        appendPre('Event created: ' + event.htmlLink);
      });
}


export default {
    addEvent,
    init,
}*/