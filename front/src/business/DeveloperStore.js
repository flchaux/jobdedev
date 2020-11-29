export default function DeveloperStore(dataLayer) {

    async function getByToken(token) {
        const dev = await dataLayer.fetchOne('Developers', { 'AppToken': token })
        if (!dev.Stack)
            dev.Stack = []
        return dev
    }

    async function addStack(dev, skillType) {
        dev.Stack.push(skillType.id)
        await dataLayer.update('Developers', dev.id,
            {
                "Stack": dev.Stack
            })
        return dev.Stack
    }

    async function removeStack(dev, skillType) {
        dev.Stack.splice(dev.Stack.indexOf(skillType.id), 1)
        await dataLayer.update('Developers', dev.id,
            {
                "Stack": dev.Stack
            })
        return dev.Stack
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

    async function updateBirthDate(dev, birthDate) {
        return dataLayer.update('Developers', dev.id,
            {
                "BirthDate": birthDate,
            })
    }

    return {
        getByToken,
        updateAgent,
        update,
        updateWish,
        updateTraits,
        updateBirthDate,
        removeStack,
        addStack
    }
}