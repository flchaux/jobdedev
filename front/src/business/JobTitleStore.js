import SimpleListStore from './SimpleListStore'

export default function JobTitleStore(dataLayer){
    return SimpleListStore(dataLayer, 'JobTitles')
}