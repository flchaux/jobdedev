
exports.DeveloperStore = function(dataLayer){

    async function getByToken(token){
        return dataLayer.fetchOne('Developers', {'AppToken': token})
    }

    async function update(dev) {
        return dataLayer.update('Developers', dev.id, 
            {
                "id": dev.id,
                "Email": dev.Email,
                "FirstName": dev.FirstName,
                "LastName": dev.LastName,
                "BirthDate": dev.BirthDate,
            })
    }
    async function updateAgent(dev, agent) {
        return dataLayer.update('Developers', dev.id, 
            {
                "Agent": [agent.id],
            })
    }

    return {
        getByToken,
        updateAgent,
        update
    }
}