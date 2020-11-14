export default function DeveloperStore(dataLayer) {

    async function getByToken(token) {
        return dataLayer.fetchOne('Developers', { 'AppToken': token })
    }

    async function update(dev) {
        return dataLayer.update('Developers', dev.id,
            {
                "FirstName": dev.FirstName,
                "LastName": dev.LastName,
            })
    }

    async function updateWish(dev, wishInfo) {
        return dataLayer.update('Developers', dev.id,
            {
                "JobTitleOptional": [wishInfo.optional.jobTitle.id],
                "JobTitleRequired": [wishInfo.required.jobTitle.id],
                "AnnualWageOptional": wishInfo.optional.wage.value,
                "AnnualWageOptionalComputing": wishInfo.optional.wage.computing,
                "AnnualWageRequired": wishInfo.required.wage.value,
                "AnnualWageRequiredComputing": wishInfo.required.wage.computing,
            })
    }

    async function updateTraits(dev, traits) {
        return dataLayer.update('Developers', dev.id,
            {
                "Traits": traits.map(t => t.id)
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
        update,
        updateWish,
        updateTraits
    }
}