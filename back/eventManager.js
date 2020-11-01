
const calendar = require('./calendar.js')
const {DeveloperStore} = require('./developerManager.js')
const {AirtableHelper} = require('./AirtableHelper.js')

exports.create = async function(devToken, startDate){
    const eventDuration = 60
    const endDate = new Date(startDate.getTime() + eventDuration*60000)
    const dev = await DeveloperStore(new AirtableHelper('keytoBw0zQgeVS3cb', 'appltRU3GEjhRaQiH')).getByToken(devToken)
    return await calendar.createEvent("s55ruh01m8heu9sgns42qhlaf0@group.calendar.google.com", {
        'summary': 'Event with ' + dev.FirstName,
        'location': '800 Howard St., San Francisco, CA 94103',
        'start': {
            'dateTime': startDate.toISOString(),
            'timeZone': 'America/Los_Angeles'
        },
        'end': {
            'dateTime': endDate.toISOString(),
            'timeZone': 'America/Los_Angeles'
        },
        /*'attendees': [
            {'email': 'chaux.florian@gmail.com'},
        ],*/
        'reminders': {
            'useDefault': false,
            'overrides': [
            {'method': 'email', 'minutes': 24 * 60},
            {'method': 'popup', 'minutes': 10}
            ]
        }
    })
   
}