export default function SkillManager(skillStore, skillTypeStore, dev) {
    dev.skills = []

    var skillTypes = []

    async function fetchSkillTypes() {
        skillTypes = await skillTypeStore.getAll()
        return skillTypes
    }

    async function fetchSkills() {
        dev.skills = await skillStore.getForDeveloper(dev);
        return dev.skills
    }


    async function addSkill(type, level) {
        if (type.length === 0) {
            throw Error('Choisis une compétence')
        }

        const skillType = await fetchOrAddSkillType(type)
        if (dev.skills.find(s => s.Skill === skillType.id) === undefined) {
            dev.skills.push((await skillStore.add(dev, { id: skillType.id }, level)).result)
            return dev.skills
        }
        else {
            throw Error('Vous avez déjà saisis cette compétence')
        }
    }
    async function removeSkill(skill) {
        const result = await skillStore.remove(dev, skill)
        if (result.success) {
            const index = dev.skills.indexOf(skill);
            if (index > -1) {
                dev.skills.splice(index, 1);
            }
        }
        return dev.skills
    }

    async function fetchOrAddSkillType(skillName) {
        var skillType = skillTypes.find(s => s.Name === skillName)
        if (skillType === undefined) {
            skillType = (await skillTypeStore.add(skillName)).result
        }
        return skillType
    }

    return {
        removeSkill,
        addSkill,
        fetchSkills,
        fetchSkillTypes,
        fetchOrAddSkillType,
    }
}