import SimpleListStore from './SimpleListStore'

export default function PriorityStore(dataLayer){
    const PriorityTypeStore = SimpleListStore(dataLayer, 'Priorities')
    
    async function getForDeveloper(dev){
        return dataLayer.fetchAll('DevPriorities', {'Developer': dev.Email}).then(result => {
            result.forEach(p => _prepare(p))
            
            return result
        })
    }

    async function getPriorityTypes(){
        return PriorityTypeStore.getAll()
    } 

    async function updateRating(priority) {
        if(!priority || !priority.id){
            throw 'priority-undefined'
        }
        console.log(priority)
        return dataLayer.update('DevPriorities', priority.id, 
            {
                "Rating": priority.Rating,
            })
    }

    async function add(dev, priorityType, rating){

        if(!priorityType || !priorityType.id){
            throw 'priorityType-undefined'
        }
        if(!dev || !dev.id){
            throw 'dev-undefined'
        } 
        if(rating <= 0 || rating > 5){
            throw 'rating-range'
        }
        console.log({
            "Developer": [dev.id],
            "Priority": [priorityType.id],
            "Rating": rating,
        })
        const response = await dataLayer.create('DevPriorities',
            {
                "Developer": [dev.id],
                "Priority": [priorityType.id],
                "Rating": rating,
            })
        response.result = _prepare(response.result)
        return response
    }

    async function remove(dev, priority){
        if(!priority || !priority.id){
            throw 'priority-undefined'
        }
        return dataLayer.destroy('DevPriorities', priority.id)
    }

    function _prepare(p){
        p.Name = p.Name[0]
        p.Priority = p.Priority[0]
        return p
    }

    return {
        getForDeveloper,
        updateRating,
        add,
        remove,
        getPriorityTypes,
    }
}