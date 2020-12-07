import moment from 'moment'

export default function EventStore(dataLayer) {

    function add(dev, event) {
        return dataLayer.create('Events', {
            Developer: [dev.id],
            Date: moment(event.Date).format(),
            Reason: event.Reason
        })
    }

    return {
        add,
    }
}