let addContactFormName = document.getElementById('add-contact-form-name');
let addContactFormEmail = document.getElementById('add-contact-form-email');
let addContactFormPhone = document.getElementById('add-contact-form-phone');
// let addContactFormName = document.getElementById('add-contact-form-name');
// let addContactFormName = document.getElementById('add-contact-form-name');
// let addContactFormName = document.getElementById('add-contact-form-name');
// let addContactFormName = document.getElementById('add-contact-form-name');
// let addContactFormName = document.getElementById('add-contact-form-name');
// let addContactFormName = document.getElementById('add-contact-form-name');

// const alphabetArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
//     'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
// ];


async function addNewContact() {
    let color = getRandomContactColor();
    let initials = getInitials(addContactFormName.value);
    await postData(CONTACTS_URL, {
        "email": addContactFormEmail.value,
        "name": addContactFormName.value,
        "phone": addContactFormPhone.value,
        "color": color,
        "initials": initials
    });
}

let colorValues = backgroundColors.map(bg => bg.replace("background: ", ""));

function getRandomContactColor() {
    let colorIndex = Math.floor(Math.random() * colorValues.length);
    return colorValues[colorIndex];
}


// async function loadContacts(path = "") {
//     let response = await fetch(CONTACTS_URL + ".json");
//     let responseAsJson = await response.json();
//     let entriesArray = [];
//     if (responseAsJson) {
//         entriesArray = Object.values(responseAsJson);
//     }
//     // console.log(entriesArray);
//     let nodeKeys = Object.keys(responseAsJson);
//     // console.log(nodeKeys);
//     let nodeValues = Object.values(responseAsJson);
//     // console.log(nodeValues);

//     return entriesArray;

// }

// loadContacts();

async function loadContactsData() {
    let response = await fetch(CONTACTS_URL + ".json");
    let responseAsJson = await response.json();
    // console.log(responseAsJson);
    return responseAsJson;

}

// loadContactsData();

async function loadSingleContact() {
    const data = await loadContactsData();
    for (let key in data) {
        console.log(data[key].name);
        console.log(data[key].email);
        console.log(data[key].phone);
        console.log(data[key].color);
        console.log(key);
    }
}
loadSingleContact();
// initContacts();

// async function initContacts() {
//     await saveNewContact();
// }

// async function postContact(path = '', contact = {}) {
//     let response = await fetch(CONTACTS_URL + ".json", {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(contact),
//     });
//     return await response.json();
// }










let contacts = [
    {
        name: "Anton Müller",
        email: "anton@example.com",
        phone: "+491234567890",
        color: "rgba(255, 116, 94, 1)",
        initials: "AM"
    },
    {
        name: "Anna Schmidt",
        email: "anna@example.com",
        phone: "+491234567891",
        color: "rgba(31, 215, 193, 1)",
        initials: "AS"
    },
    {
        name: "Hanni Weber",
        email: "hanni@example.com",
        phone: "+491234567892",
        color: "rgba(195, 255, 43, 1)",
        initials: "HW"
    },
    {
        name: "Hannelore Maier",
        email: "hannelore@example.com",
        phone: "+491234567893",
        color: "rgba(110, 82, 255, 1)",
        initials: "HM"
    },
    {
        name: "Martin Fischer",
        email: "martin@example.com",
        phone: "+491234567894",
        color: "rgba(0, 190, 232, 1)",
        initials: "MF"
    },
    {
        name: "Martina Becker",
        email: "martina@example.com",
        phone: "+491234567895",
        color: "rgba(255, 94, 179, 1)",
        initials: "MB"
    },
    {
        name: "Anna Meier",
        email: "anna.meier@example.com",
        phone: "+491234567896",
        color: "rgba(147, 39, 255, 1)",
        initials: "AM"
    }
];

function getFirstName(fullName) {
    return fullName.split(' ')[0];
}

function getSurname(fullName) {
    return fullName.split(' ')[1];
}

function sortContacts(contacts) {
    contacts.sort((a, b) => {
        let firstNameA = getFirstName(a.name).toUpperCase();
        let firstNameB = getFirstName(b.name).toUpperCase();

        if (firstNameA < firstNameB) {
            return -1;
        }
        if (firstNameA > firstNameB) {
            return 1;
        }

        let surnameA = getSurname(a.name).toUpperCase();
        let surnameB = getSurname(b.name).toUpperCase();

        if (surnameA < surnameB) {
            return -1;
        }
        if (surnameA > surnameB) {
            return 1;
        }
        return 0;
    });
}

sortContacts(contacts);

// Initialize an object to hold subarrays for each letter of the alphabet
let contactsByLetter = {};

// Iterate over each contact and organize them into subarrays by first letter of name
contacts.forEach(contact => {
    let firstLetter = getFirstName(contact.name)[0].toUpperCase();
    if (!contactsByLetter[firstLetter]) {
        contactsByLetter[firstLetter] = [];
    }
    contactsByLetter[firstLetter].push(contact);
});

console.log(contactsByLetter);

console.log(Object.keys(contactsByLetter));
console.log(contactsByLetter);
console.log(contactsByLetter);

// function renderContactsList() {
//     let contactsByLetterKeys = Object.keys(contactsByLetter)
//     for (let i = 0; i < contactsByLetterKeys.length; i++) {
//         const capitalLetter = contactsByLetterKeys[i];
//         console.log(capitalLetter);
//         let contactsLetter = contactsByLetter[capitalLetter];
//         console.log(contactsLetter);
//         for (let j = 0; j < contactsLetter.length; j++) {
//             const contactsEntry = contactsLetter[j];
//             console.log(contactsEntry);
//             let renderedName = contactsEntry.name;
//             let renderedEmail = contactsEntry.email;
//             let renderedPhone = contactsEntry.phone;
//             let renderedColor = contactsEntry.color;
//             let renderedInitials = contactsEntry.initials;
//             console.log(renderedName);
//             console.log(renderedEmail);
//             console.log(renderedPhone);
//             console.log(renderedColor);
//             console.log(renderedInitials);
//             // contactsList.innerHTML += renderContactsListHtml();

//         }

//     }
// }

// function renderContactsList() {
//     let contactsByLetterKeys = Object.keys(contactsByLetter);

//     contactsByLetterKeys.forEach(capitalLetter => {
//         console.log(capitalLetter); // Log the capital letter (A, B, C, ...)

//         contactsByLetter[capitalLetter].forEach(contact => {
//             console.log(contact.name); // Log the contact's name
//             console.log(contact.email); // Log the contact's email
//             console.log(contact.phone); // Log the contact's phone number
//             console.log(contact.color); // Log the contact's color
//             console.log(contact.initials); // Log the contact's initials
//             contactsList.innerHTML += renderContactsListHtml(contact);
//         });
//     });
// }


// document.getElementById('renderContactsButton').addEventListener('click', function () {

/**
 * Iterates over each capital letter key and corresponding contacts array in the contactsByLetter object,
 * rendering each capital letter followed by its contacts using specified rendering functions.
 *
 * @param {Object.<string, Array>} contactsByLetter - Object where keys are capital letters and values are arrays of contacts.
 * @param {Function} renderCapitalLetter - Function to render each capital letter.
 * @param {Function} renderContact - Function to render each contact.
 */

/**
 * Renders contacts grouped by capital letters.
 * For each capital letter, it calls renderCapitalLetter() to render the letter,
 * and iterates over the contacts associated with that letter to call renderContact()
 * for each contact.
 *
 * @param {Object} contactsByLetter - An object where keys are capital letters (A-Z)
 *                                   and values are arrays of contacts starting with that letter.
 *                                   Example:
 *                                   {
 *                                     A: [{ name: 'Alice', ... }, { name: 'Anna', ... }],
 *                                     B: [{ name: 'Bob', ... }],
 *                                     ...
 *                                   }
 * @returns {void}
 */
Object.entries(contactsByLetter).forEach(([capitalLetter, contacts]) => {
    contactsList.innerHTML += renderCapitalLetter(capitalLetter);
    contacts.forEach(contact => {
        contactsList.innerHTML += renderContact(contact);
    });
});



// Call the render function to display the sorted contacts


// Convert the object into an array of subarrays sorted alphabetically by letter
// let contactsGroupedByLetter = Object.keys(contactsByLetter)
//     .sort()
//     .map(letter => contactsByLetter[letter]);

// console.log(contactsGroupedByLetter);