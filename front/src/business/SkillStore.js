
export default function SkillStore(dataLayer){

    async function getForDeveloper(dev){
        return dataLayer.fetchAll('DevSkills', {'Developer': dev.Email})
    }

    async function getSkillTypes(){
        return dataLayer.fetchAll('Skills')
    }

    async function updateLevel(skill) {
        if(!skill || !skill.id){
            throw 'skill-undefined'
        }
        return dataLayer.update('DevSkills', skill.id, 
            {
                "Level": skill.Level,
            })
    }

    async function add(dev, skillType, level){

        if(!skillType || !skillType.id){
            throw 'skillType-undefined'
        }
        if(!dev || !dev.id){
            throw 'dev-undefined'
        } 
        if(level <= 0 || level > 5){
            throw 'level-range'
        }
        return dataLayer.create('DevSkills',
            {
                "Developer": [dev.id],
                "Skill": [skillType.id],
                "Level": level,
            })
    }

    async function remove(dev, skill){
        if(!skill || !skill.id){
            throw 'skill-undefined'
        }
        return dataLayer.destroy('DevSkills', skill.id)
    }

    async function addSkillType(name){
        if(!name || name.length === 0){
            throw 'name-empty'
        }
        return dataLayer.create('Skills',
        {
            "Name": name
        })
    }

    return {
        getForDeveloper,
        updateLevel,
        add,
        remove,
        getSkillTypes,
        addSkillType,
    }
}