export default function PriorityManager(priorityStore, dev) {
    dev.priorities = []

    var priorityTypes = []

    async function fetchPriorityTypes() {
        priorityTypes = await priorityStore.getPriorityTypes()
        return priorityTypes
    }

    async function fetchPriorities() {
        (await priorityStore.getForDeveloper(dev)).forEach(p => {
            dev.priorities[p.Name] = p
        });
        return dev.priorities
    }

    async function addOrUpdatePriority(priority) {
        const priorityType = priorityTypes.find((t) => t.Name === priority.Name)
        if (!priority.id) {
            dev.priorities[priorityType.Name] = (await priorityStore.add(dev, { id: priorityType.id }, priority.Rating)).result
        }
        else {
            await priorityStore.updateRating(priority)
        }
        return dev.priorities
    }

    async function updateAll() {
        for (var priorityName in dev.priorities) {
            addOrUpdatePriority(dev.priorities[priorityName])
        }
    }

    return {
        addOrUpdatePriority,
        fetchPriorities,
        fetchPriorityTypes,
        updateAll,
        dev
    }
}