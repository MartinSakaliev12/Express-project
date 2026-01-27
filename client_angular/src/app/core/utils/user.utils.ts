


export class UserUtils{
    getInitials(name:string, email:string):string|undefined{
    // trim form and last part
    // happy path "Martin Sakaliev"  
    // if there is only name and email and first symbol is same return it
    // if has name and last name get from name
    // create to work if it has empty name or emty email
    if (name != null) {
        name = name.trim()
    }
    if (email != null) {
        email = email.trim()
    }

    if (name != "" && name != null && email != "" && email != null) {
        const splitedName = name.split(/\s+/)
        if (splitedName.length != 1) {
            let firstInitial = splitedName[0][0].toUpperCase()
            let secondInital = splitedName[splitedName.length - 1][0].toUpperCase()
            return firstInitial + secondInital
        } else {
            let firstInitial = splitedName[0][0].toUpperCase()
            if (firstInitial == email[0].toUpperCase()) {// to check is first symbol is same as the email and if it is to return it but not workinmg
                return firstInitial
            } else {
                //TOdo to return first symbol from email and name when they are different
                return firstInitial + email[0].toUpperCase();
            }
        }
    } else if (name == "" || name == null && email != "" && email != null) {
        let [namePart, emailPart] = email.split('@')
        let splitedNamePart = namePart.split(/[._-]+/)
        if (splitedNamePart.length != 1) {

            let firstInitial = splitedNamePart[0][0].toUpperCase();
            let secondInital = splitedNamePart[splitedNamePart.length - 1][0].toUpperCase();
            return firstInitial + secondInital;
        } else {
            return splitedNamePart[0][0].toUpperCase();
        }


    } else if (name != "" && name != null && email == "" || email == null) {
        const splitedName = name.split(/\s+/)
        if (splitedName.length != 1) {
            let firstInitial = splitedName[0][0].toUpperCase()
            let secondInital = splitedName[splitedName.length - 1][0].toUpperCase()
            return firstInitial + secondInital
        } else {
            return splitedName[0][0].toUpperCase()
        }
    }

}
}