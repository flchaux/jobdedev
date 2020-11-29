
export default function AgentStore(dataLayer) {

    async function getAllAvailable() {
        return dataLayer.fetchAll('Agents', '{Availabilities} != "None"')
    }

    async function getById(id) {
        if (id)
            return dataLayer.fetchOneById('Agents', id)
        throw Error('id undefined')
    }

    return {
        getAllAvailable,
        getById,
    }
}