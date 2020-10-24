
export default function DeveloperStore(dataLayer){

    async function getByToken(token){
        return dataLayer.fetchOne('Developers', {'AppToken': token})
    }

    async function update(candidate) {
        return dataLayer.update('Developers', candidate.id, 
            {
                "id": candidate.id,
                "Email": candidate.Email,
                "FirstName": candidate.FirstName,
                "LastName": candidate.LastName,
                "BirthDate": candidate.BirthDate,
            })
    }
    
    return {
        getByToken,
        update
    }
}