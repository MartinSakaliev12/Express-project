
let loadButton = document.getElementById("loadBtn")
let table = document.getElementById("table")
const AVATAR_COLORS = [
  "#1ABC9C", // turquoise
  "#2ECC71", // emerald
  "#3498DB", // peter river
  "#9B59B6", // amethyst
  "#34495E", // wet asphalt
  "#16A085", // green sea
  "#27AE60", // nephritis
  "#2980B9", // belize hole
  "#8E44AD", // wisteria
  "#2C3E50"  // midnight blue
];

console.log(table)
loadButton.addEventListener("click",loadUsers)

async function getUsers(){
    let users
    const response = await fetch("https://jsonplaceholder.typicode.com/users")
    users = await response.json()
    return users
}



async function loadUsers(){
    let users = await getUsers()
    console.log(users)
    for(let user of users){
        let initials = getInitials(user.name)
        let color = getColors(initials)
        let tableRow = document.createElement("tr")
        let tableHedaer = document.createElement("th")
        tableHedaer.style.backgroundColor = color;
        tableHedaer.textContent = initials
        tableRow.appendChild(tableHedaer)
        table.appendChild(tableRow)
    }
    
}




console.log(getInitials(null, "johndoe@mail.com"))
function getInitials (name,email){
    // trim form and last part
    // happy path "Martin Sakaliev"  
    // if there is only name and email and first symbol is same return it
    //todo if has name and last name get from name
    //todo create to work if it has empty name or emty email
    if(name != null){
        name = name.trim()
    }
    if(email != null){
        email = email.trim()
    }

    if(name != "" && name != null && email != "" && email !=null){
        const splitedName = name.split(/\s+/)
        if(splitedName.length != 1){
            let firstInitial = splitedName[0][0].toUpperCase()
            let secondInital = splitedName[splitedName.length - 1][0].toUpperCase()
            return firstInitial+secondInital
        }else{
            let firstInitial = splitedName[0][0].toUpperCase()
            if(firstInitial == email[0].toUpperCase()){// to check is first symbol is same as the email and if it is to return it but not workinmg
                 return firstInitial
            }else{
                //TOdo to return first symbol from email and name when they are different
                return firstInitial+email[0].toUpperCase();
            }
        }
    }else if(name == "" || name == null && email != "" && email !=null){
        let [namePart,emailPart] = email.split('@')
        let splitedNamePart = namePart.split(/[._-]+/)
        if(splitedNamePart.length != 1){

            let firstInitial = splitedNamePart[0][0].toUpperCase();
            let secondInital = splitedNamePart[splitedNamePart.length - 1][0].toUpperCase();
            return firstInitial+secondInital;
        }else{
            return splitedNamePart[0][0].toUpperCase();
        }


    }else if(name != "" && name != null && email == "" || email ==null){
        const splitedName = name.split(/\s+/)
        if(splitedName.length != 1){
            let firstInitial = splitedName[0][0].toUpperCase()
            let secondInital = splitedName[splitedName.length - 1][0].toUpperCase()
            return firstInitial+secondInital
        }else{
            return splitedName[0][0].toUpperCase()
        }
    }
    
}




console.log(getColors("J"))
function getColors(initials){
    if(initials == "" || initials == null){
        return AVATAR_COLORS[0]
    }
    let sum = 0;
    for(let i = 0; i < initials.length; i++){
        sum+= initials.charCodeAt(i)
    }
    const colorIndex = sum % 10
    return AVATAR_COLORS[colorIndex]
}