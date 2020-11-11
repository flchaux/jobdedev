
export default function ExperienceStore(dataLayer){

    async function getForDeveloper(dev){
        return dataLayer.fetchAll('Experiences', {'Developer': dev.Email})
    }

    async function update(experience) {
        if(!experience || !experience.id){
            throw 'experience-undefined'
        }
        return dataLayer.update('Experiences', experience.id, {
            "StartDate": experience.StartDate,
            "EndDate": experience.EndDate,
            "Entreprise": experience.Entreprise,
            "Job": experience.Job,
            "Description": experience.Description
        })
    }

    async function add(dev, experience){

        if(!experience){
            throw 'experience-undefined'
        }
        if(!dev || !dev.id){
            throw 'dev-undefined'
        } 
        return dataLayer.create('Experiences',
            {
                "Developer": [dev.id],
                "StartDate": experience.StartDate,
                "EndDate": experience.EndDate ?? null,
                "Entreprise": experience.Entreprise,
                "Job": experience.Job,
                "Description": experience.Description,
            })
    }

    async function remove(experience){
        if(!experience || !experience.id){
            throw 'experience-undefined'
        }
        return dataLayer.destroy('Experiences', experience.id)
    }


    return {
        getForDeveloper,
        update,
        add,
        remove,
    }
}