import SimpleListStore from './SimpleListStore'

export default function TraitStore(dataLayer){
    const parent = SimpleListStore(dataLayer, 'Traits')
    function getForDeveloper(dev)
    {
        return dataLayer.fetchAll('Traits', {'Developers': dev.Email})
    } 
    return { ...parent, getForDeveloper }
}