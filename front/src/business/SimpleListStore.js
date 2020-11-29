
export default function SimpleListStore(dataLayer, table, readonly = false) {
    async function getAll() {
        return dataLayer.fetchAll(table)
    }

    async function add(name) {
        if (!name || name.length === 0) {
            throw Error('name-empty')
        }
        return dataLayer.create(table,
            {
                "Name": name
            })
    }

    return {
        getAll,
        ...!readonly && { add: add }
    }
}