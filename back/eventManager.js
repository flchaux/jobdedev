
const calendar = require('./calendar.js')
const {DeveloperStore} = require('./developerManager.js')
const {AirtableHelper} = require('./AirtableHelper.js')

exports.create = async function(devToken, startDate){
    const eventDuration = 60
    const endDate = new Date(startDate.getTime() + eventDuration*60000)
    const dev = await DeveloperStore(new AirtableHelper(process.env.REACT_APP_API_KEY, process.env.REACT_APP_BASE)).getByToken(devToken)
    return await calendar.createEvent(process.env.REACT_APP_CALENDAR, {
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
        'reminders': {
            'useDefault': false,
            'overrides': [
            {'method': 'email', 'minutes': 24 * 60},
            {'method': 'popup', 'minutes': 10}
            ]
        }
    })
   
}