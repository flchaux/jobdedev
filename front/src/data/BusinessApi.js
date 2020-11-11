
import axios from 'axios';
export default function BusinessApi(root, appToken){
    async function createEvent(startDate){
        const response = await axios.post(root + '/event', {
            token: appToken,
            start: startDate.toISOString()
        });
        return response.data
    }
    return {
        createEvent,
    }
}