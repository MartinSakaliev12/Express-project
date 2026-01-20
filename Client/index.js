
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
loadButton.addEventListener("click", loadUsers)



async function getUsers() {
    let users
    const response = await fetch("http://localhost:3000/users")
    users = await response.json()
    console.log(users)
    return users
}

const addButton = document.getElementById("add-btn")
const addForm = document.getElementById("add-user-row")

addButton.addEventListener('click', addFormVisibleOrNot)
let isAddFormVisible = false
function addFormVisibleOrNot() {
    if (!isAddFormVisible) {
        isAddFormVisible = true
        addForm.style.display = "contents"
    } else {
        isAddFormVisible = false;
        addForm.style.display = "none"
    }

}


async function loadUsers() {
    let users = await getUsers()
    console.log(users)
    for (let user of users) {
        let initials = getInitials(user.name)
        let color = getColors(initials)
        let tableRow = document.createElement("tr")

        let editButton = document.createElement("button")
        editButton.textContent = "Edit"
        editButton.classList.add("edit-btn")
        editButton.dataset.id = user.id
        let deleteButton = document.createElement("button")
        deleteButton.textContent = "Delete"
        deleteButton.classList.add("delete-btn")

        let tableDataAvatar = document.createElement("td")
        let tableDataName = document.createElement("td")
        let tableDataEmail = document.createElement("td")
        let tableDataButtons = document.createElement("td")


        tableDataName.textContent = user.name;
        tableDataEmail.textContent = user.email;

        let tableDataAvatarPara = document.createElement("p")

        tableDataAvatarPara.style.backgroundColor = color;
        tableDataAvatarPara.textContent = initials
        tableDataAvatar.appendChild(tableDataAvatarPara)
        tableDataButtons.appendChild(editButton)
        tableDataButtons.appendChild(deleteButton)

        tableRow.appendChild(tableDataAvatar)
        tableRow.appendChild(tableDataName)
        tableRow.appendChild(tableDataEmail)
        tableRow.appendChild(tableDataButtons)

        table.appendChild(tableRow)

    }

}

document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("edit-btn")) {
    const tr = e.target.closest("tr");
    const id = e.target.dataset.id;

    // 🔥 Вземаме данните правилно
    const response = await fetch(`http://localhost:3000/users/${id}`);
    const user = await response.json(); // ← това липсва при теб

    const { name, email } = user;

    tr.innerHTML = `
      <td>
        <p class="avatar" style="background-color: ${getColors(getInitials(name, email))};">
          ${getInitials(name, email)}
        </p>
      </td>
      <td><input type="text" value="${name}" class="edit-name"></td>
      <td><input type="email" value="${email}" class="edit-email"></td>
      <td>
        <button class="save-btn" data-id="${id}">Save</button>

      </td>
    `;
  }
});

document.addEventListener("click", async (e) => {
    if (e.target.classList.contains("save-btn")) {
        const tr = e.target.closest("tr");
        const id = e.target.dataset.id;

        const updatedUser = {
            name: tr.querySelector(".edit-name").value,
            email: tr.querySelector(".edit-email").value
        };

        const response = await fetch(`http://localhost:3000/users/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedUser)
        });

        const result = await response.json();
        
        const initials = getInitials(result.name, result.email);
        const bgColor = getColors(initials);
        
        tr.innerHTML = `
  <td>
    <p style="background-color: ${bgColor};" class="avatar">${initials}</p>
  </td>
  <td>${result.name}</td>
  <td>${result.email}</td>
  <td>
    <button class="edit-btn" data-id="${result.id}">Edit</button>
    <button class="delete-btn" data-id="${result.id}">Delete</button>
  </td>
`;

    }
});



document.getElementById("add-user-btn").addEventListener("click", async () => {
    const name = document.getElementById("new-name").value.trim();
    const email = document.getElementById("new-email").value.trim();

    if (!name || !email) {
        alert("Enter name and email");
        return;
    }

    const newUser = {
        name,
        email,
    };

    try {
        const response = await fetch("http://localhost:3000/users/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        });

        if (!response.ok) {
            throw new Error("Error");
        }

        const result = await response.json();
        console.log("Added:", result);

        // Изчистване на формата
        document.getElementById("new-name").value = "";
        document.getElementById("new-email").value = "";

        // Може да презаредиш таблицата тук
        await loadUsers()
        addFormVisibleOrNot();

    } catch (error) {
        console.error("Error:", error);
        alert("Failed add");
    }
});



console.log(getInitials(null, "johndoe@mail.com"))
function getInitials(name, email) {
    // trim form and last part
    // happy path "Martin Sakaliev"  
    // if there is only name and email and first symbol is same return it
    //todo if has name and last name get from name
    //todo create to work if it has empty name or emty email
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




console.log(getColors("J"))
function getColors(initials) {
    if (initials == "" || initials == null) {
        return AVATAR_COLORS[0]
    }
    let sum = 0;
    for (let i = 0; i < initials.length; i++) {
        sum += initials.charCodeAt(i)
    }
    const colorIndex = sum % 10
    return AVATAR_COLORS[colorIndex]
}