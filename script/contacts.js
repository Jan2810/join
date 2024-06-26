let addContactFormName = document.getElementById('add-contact-form-name');
let addContactFormEmail = document.getElementById('add-contact-form-email');
let addContactFormPhone = document.getElementById('add-contact-form-phone');
// let addContactFormName = document.getElementById('add-contact-form-name');
// let addContactFormName = document.getElementById('add-contact-form-name');
// let addContactFormName = document.getElementById('add-contact-form-name');
// let addContactFormName = document.getElementById('add-contact-form-name');
// let addContactFormName = document.getElementById('add-contact-form-name');
// let addContactFormName = document.getElementById('add-contact-form-name');



async function addNewContact() {
    let color = getRandomContactColor();
    await postContact('', {
        "email": addContactFormEmail.value,
        "name": addContactFormName.value,
        "phone": addContactFormPhone.value,
        "color": color
    });
}

let colorValues = backgroundColors.map(bg => bg.replace("background: ", ""));

function getRandomContactColor() {
    let colorIndex = Math.floor(Math.random() * colorValues.length);
    return colorValues[colorIndex];
}


async function loadContacts(path = "") {
    let response = await fetch(CONTACTS_URL + ".json");
    let responseAsJson = await response.json();
    let entriesArray = [];
    if (responseAsJson) {
        entriesArray = Object.values(responseAsJson);
    }
    console.log(entriesArray);
    return entriesArray;

}

loadContacts();





// initContacts();

async function initContacts() {
    await saveNewContact();
}

async function postContact(path = '', contact = {}) {
    let response = await fetch(CONTACTS_URL + path + ".json", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
    });
    return await response.json();
}