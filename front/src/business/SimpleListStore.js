
export default function SimpleListStore(dataLayer, table){
    async function getAll(){
        return dataLayer.fetchAll(table)
    }

    async function add(name){
        if(!name || name.length === 0){
            throw 'name-empty'
        }
        return dataLayer.create(table,
        {
            "Name": name
        })
    }

    return {
        getAll,
        add
    }
}