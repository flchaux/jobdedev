
export default function SkillStore(dataLayer) {

    async function getAll() {
        return dataLayer.fetchAll('Skills')
    }

    async function add(name) {
        if (!name || name.length === 0) {
            throw Error('name-empty')
        }
        return dataLayer.create('Skills',
            {
                "Name": name
            })
    }

    return {
        getAll,
        add,
    }
}