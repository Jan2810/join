let colorValues = backgroundColors.map(bg => bg.replace("background: ", ""));

function getRandomContactColor() {
    let colorIndex = Math.floor(Math.random() * colorValues.length);
    return colorValues[colorIndex];
}

async function addNewContact(event) {
    event.preventDefault();
    let email = document.getElementById("register-input-email");
    let name = document.getElementById("register-input-name");
    let color = getRandomContactColor();
    let initials = getInitials(name.value);
    initials = initials.substring(0, 3);
    await addNewContactBackend(name, email, color, initials);
}

async function addNewContactBackend(name, email, color, initials) {
    if (email.value.trim() && name.value.trim()) {
        let newContact = {
            "email": email.value,
            "name": name.value,
            "phone": '',
            "color": color,
            "initials": initials,
        };
        await postData(CONTACTS_URL, newContact);
    }
}


