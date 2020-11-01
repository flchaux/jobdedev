const {google} = require('googleapis');

exports.createEvent = async function(calendarId, event) {
    return new Promise((resolve) => {
        const auth = new google.auth.GoogleAuth({
            keyFile: 'serviceaccount.json',
            scopes: ['https://www.googleapis.com/auth/cloud-platform', 'https://www.googleapis.com/auth/calendar'],
        });
        const calendar = google.calendar({version: 'v3', auth});
        var request = calendar.events.insert({
            calendarId: calendarId,
            resource: event
        }).then((result) => {
            resolve({success: true, event: event})
        }).catch((exception) => {
            console.log(exception)
            resolve({success: false, error: exception})
        })
    })
}

exports.listEvents = function(calendarId){
    calendar.events.list({
        calendarId: 's55ruh01m8heu9sgns42qhlaf0@group.calendar.google.com',
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
      }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const events = res.data.items;
        if (events.length) {
          console.log('Upcoming 10 events:');
          events.map((event, i) => {
            const start = event.start.dateTime || event.start.date;
            console.log(`${start} - ${event.summary}`);
          });
        } else {
          console.log('No upcoming events found.');
        }
      });
}