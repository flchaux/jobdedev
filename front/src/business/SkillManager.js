export default function SkillManager(skillStore, dev) {
    dev.skills = []

    var skillTypes = []

    async function fetchSkillTypes(){
        skillTypes = await skillStore.getSkillTypes()
        return skillTypes
    }

    async function fetchSkills(){
        dev.skills = await skillStore.getForDeveloper(dev);
        return dev.skills
    } 


    async function addSkill(type, level){
        if(type.length === 0){
            throw 'Choisis une compétence'
        }
        
        const skillType = await _fetchOrAddSkillType(type)
        if(!_hasAlreadySkillType(skillType)){
            dev.skills.push((await skillStore.add(dev, {id: skillType.id}, level)).result)
            return dev.skills
        }
        else{
            throw 'Vous avez déjà saisis cette compétence'
        }
    }
    async function removeSkill(skill){
        const result = await skillStore.remove(dev, skill)
        if(result.success){
            const index = dev.skills.indexOf(skill);
            if (index > -1) {
                dev.skills.splice(index, 1);
            }
        }
        return dev.skills
    }

    function _hasAlreadySkillType(skillType){
        var hasAlreadySkillType = false;
        dev.skills.forEach(s => {
            if(s.Skill == skillType.id){
                hasAlreadySkillType = true
            }
        });
        return hasAlreadySkillType
    }

    async function _fetchOrAddSkillType(skillName){
        var skillType = null;
        skillTypes.forEach(s => {
            if(s.Name === skillName){
                skillType = s;
            }
        });
        if(skillType == null){
            skillType = (await skillStore.addSkillType(skillName)).result
        }
        return skillType
    }

    return {
        removeSkill,
        addSkill,
        fetchSkills,
        fetchSkillTypes,
    }
}