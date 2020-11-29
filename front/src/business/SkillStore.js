
export default function SkillStore(dataLayer) {

    async function getForDeveloper(dev) {
        return dataLayer.fetchAll('DevSkills', { 'Developer': dev.Email })
    }

    async function updateLevel(skill) {
        if (!skill || !skill.id) {
            throw Error('skill-undefined')
        }
        return dataLayer.update('DevSkills', skill.id,
            {
                "Level": skill.Level,
            })
    }

    async function add(dev, skillType, level) {

        if (!skillType || !skillType.id) {
            throw Error('skillType-undefined')
        }
        if (!dev || !dev.id) {
            throw Error('dev-undefined')
        }
        if (level <= 0 || level > 5) {
            throw Error('level-range')
        }
        return dataLayer.create('DevSkills',
            {
                "Developer": [dev.id],
                "Skill": [skillType.id],
                "Level": level,
            })
    }

    async function remove(dev, skill) {
        if (!skill || !skill.id) {
            throw Error('skill-undefined')
        }
        return dataLayer.destroy('DevSkills', skill.id)
    }

    return {
        getForDeveloper,
        updateLevel,
        add,
        remove
    }
}