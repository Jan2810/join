let colorValues = backgroundColors.map(bg => bg.replace("background: ", ""));

async function initContacts() {
    await includeHTML();
    setBackground(3);
}

function getRandomContactColor() {
    let colorIndex = Math.floor(Math.random() * colorValues.length);
    return colorValues[colorIndex];
}

function displayContactCreatedPopup(event) {
    event.preventDefault();
    addContactsOverlayBg.classList.remove('add-contacts-overlay-bg-transition');
    closeAddContactOverlay();
    setTimeout(() => {
        addContactsOverlayBg.classList.add('add-contacts-overlay-bg-transition');
    }, 10);

    if (window.innerWidth >= 800) {

    } else {
        contactsContainer.classList.remove('d-flex');
        contactsContainer.classList.add('d-none');
        contactContainer.classList.remove('d-none');
        // manuallyRemoved = true;
    }
    contactCreatedPopupBg.classList.remove('hide-contact-created-popup');
    setTimeout(function () {
        contactCreatedPopupBg.classList.add('hide-contact-created-popup');
    }, 800);
}

// function updateNewContactDetails(contact) {
//     badgeAndName.style.display = 'flex';
//     profileBadge.style.backgroundColor = contact.color;
//     profileBadge.textContent = contact.initials;
//     contactName.textContent = contact.name;
//     contactLink.href = `mailto:${contact.email}`;
//     contactLink.textContent = contact.email;
//     contactInformation.classList.remove('d-none');
//     contactPhone.textContent = contact.phone;
// }

async function addNewContact(event) {
    event.preventDefault();
    console.log(addContactFormName.value);
    let color = getRandomContactColor();
    let initials = getInitials(addContactFormName.value);
    initials = initials.substring(0, 3);
    await addNewContactBackend(color, initials);
}

async function addNewContactBackend(color, initials) {
    if (addContactFormEmail.value.trim() && addContactFormName.value.trim() && addContactFormPhone.value.trim()) {
        let newContact = {
            "email": addContactFormEmail.value,
            "name": addContactFormName.value,
            "phone": addContactFormPhone.value,
            "color": color,
            "initials": initials,
        };
        await postData(CONTACTS_URL, newContact);
        addNewContactFrontend(newContact);
    }
}

async function addNewContactFrontend(newContact) {
    await renderContactsList();
    // updateNewContactDetails(newContact);
    showSingleContactView(null, newContact.color, newContact.initials, newContact.name, newContact.email, newContact.phone);
    clearInput();
}



function clearInput() {
    addContactFormEmail.value = '';
    addContactFormName.value = '';
    addContactFormPhone.value = '';
}

async function loadContactsData() {
    let response = await fetch(CONTACTS_URL + ".json", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        cache: 'no-store'
    });
    let responseAsJson = await response.json();
    return responseAsJson;
}

// Process data into a contacts array
async function processContactsData() {
    const data = await loadContactsData();
    let contacts = [];
    for (let key in data) {
        contacts.push({
            name: data[key].name,
            email: data[key].email,
            phone: data[key].phone,
            color: data[key].color,
            initials: data[key].initials,
            id: key,
        });
    }
    return contacts;
}

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

// Organize contacts by first letter
function organizeContactsByLetter(contacts) {
    let contactsByLetter = {};

    contacts.forEach(contact => {
        let firstLetter = getFirstName(contact.name)[0].toUpperCase();
        if (!contactsByLetter[firstLetter]) {
            contactsByLetter[firstLetter] = [];
        }
        contactsByLetter[firstLetter].push(contact);
    });
    return contactsByLetter;
}

async function renderContactsListHtml(contactsByLetter) {
    let html = renderNewContactButton();
    for (let [capitalLetter, contacts] of Object.entries(contactsByLetter)) {
        html += renderCapitalLetter(capitalLetter);
        for (let contact of contacts) {
            let renderedContact = await renderContact(contact);
            html += renderedContact;
        }
    }
    contactsList.innerHTML = html;
    // await updateStatusNew();
}

async function renderContactsList() {
    await new Promise(resolve => setTimeout(resolve, 40));
    let contacts = await processContactsData();
    sortContacts(contacts);

    let contactsByLetter = organizeContactsByLetter(contacts);
    await renderContactsListHtml(contactsByLetter);
}

renderContactsList();

// async function updateContactStatus(key, newStatus) {
//     const url = `${CONTACTS_URL}${key}/status.json`;
//     await fetch(url, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(newStatus)
//     });
// }

// async function updateStatusNew() {
//     const contactsData = await loadContactsData();
//     for (let key in contactsData) {
//         if (contactsData[key].status) {
//         }
//         if (contactsData[key].status && contactsData[key].status === 'new') {
//             await updateContactStatus(key, 'normal');
//         }
//     }

// }




function showSingleContactView(selectedContact, color, initials, name, email, phone) {
    badgeAndName.style.display = 'flex';
    profileBadge.style.backgroundColor = color;
    profileBadge.textContent = initials;
    contactName.textContent = name;
    contactLink.href = `mailto:${email}`;
    contactLink.textContent = email;
    contactInformation.classList.remove('d-none');
    contactPhone.textContent = phone;
    nameEmailPhoneForEdit = [color, initials, name, email, phone];
    prepareToHighlightContact(selectedContact, email);
}

function prepareToHighlightContact(selectedContact, email) {
    if (selectedContact) {
        highlightContact(selectedContact);
    } else {
        findAndHighlightContact(email);
    }
}

function highlightContact(selectedContact) {
    removeViewedContactClass();
    selectedContact.classList.add('viewed-contact');
    if (window.innerWidth < 1120) {
        showSingleContactOnly();
    }
}

function findAndHighlightContact(email) {
    const contactsEmailElements = document.querySelectorAll('.contacts-email');
    let selectedContact = null;

    contactsEmailElements.forEach(element => {
        if (element.textContent.trim() === email) {
            selectedContact = element.closest('.contacts-list-box-entry');
        }
    });

    if (selectedContact) {
        highlightContact(selectedContact);
    }
}

// Edit contact:

function displayNameEmailPhoneForEdit() {
    console.log(nameEmailPhoneForEdit);
    editName.value = nameEmailPhoneForEdit[2] || '';
    editEmail.value = nameEmailPhoneForEdit[3] || '';
    editPhone.value = nameEmailPhoneForEdit[4] || '';
    editBadge.textContent = nameEmailPhoneForEdit[1] || 'GN';
    editBadge.style.backgroundColor = nameEmailPhoneForEdit[0] || '#fff';
}

async function editContact(event) {
    event.preventDefault();
    let contact = [editEmail.value, editName.value, editPhone.value, editBadge.textContent, editBadge.style.backgroundColor]
    if (editName.value.trim() && editEmail.value.trim() && editPhone.value.trim()) {
        let contacts = await loadContactsData();
        for (let key in contacts) {
            if (contacts[key].name === nameEmailPhoneForEdit[2]) {
                updateContactBackend(key, contact);
                updateInMemoryContactData(contact);
                break;
            }
        }
        updateContactFrontend(contact);
    }
}

async function updateContactBackend(key, contact) {
    const url = `${CONTACTS_URL}${key}.json`;
    await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "color": contact[4],
            "email": contact[0],
            "initials": contact[3],
            "name": contact[1],
            "phone": contact[2],
            "status": 'normal'
        })
    });
}

function closeOverlayAfterEditWithoutTransition() {
    editContactsOverlayBg.classList.remove('edit-contacts-overlay-bg-transition');
    closeEditContactOverlay();
    setTimeout(() => {
        editContactsOverlayBg.classList.add('edit-contacts-overlay-bg-transition');
    }, 10);
}

async function updateContactFrontend(contact) {
    contactName.textContent = contact[1];
    contactLink.href = `mailto:${contact[0]}`;
    contactLink.textContent = contact[0];
    contactPhone.textContent = contact[2];
    closeOverlayAfterEditWithoutTransition();
    await renderContactsList();
    findAndHighlightContact(contact[0]);
}

function updateInMemoryContactData(contact) {
    nameEmailPhoneForEdit = [
        contact[4], // backgroundColor
        contact[3], // initials
        contact[1], // name
        contact[0], // email
        contact[2]  // phone
    ];
}

async function deleteContactBackend() {
    let contacts = await loadContactsData();
    for (let key in contacts) {
        if (contacts[key].name === nameEmailPhoneForEdit[2]) {
            await deleteData(CONTACTS_URL, key);
            break;
        }
    }
    await deleteContactFrontend();
}

async function deleteContactFrontend() {
    badgeAndName.style.display = 'none';
    contactInformation.classList.add('d-none');
    nameEmailPhoneForEdit = [];
    if (window.innerWidth < 1120) {
        returnToContactsList();
    }
    if (!editContactsOverlayBg.classList.contains('hidden')) {
        closeOverlayAfterEditWithoutTransition();
    }
    await renderContactsList();
}


async function fetchExistingEmails() {
    let contacts = await loadContactsData();
    let emails = [];
    for (let key in contacts) {
        if (contacts[key].email) {
            emails.push(contacts[key].email);
        }
    }
    return emails;
}

let existingEmails = [];

document.querySelectorAll('.add-contact-form-email, .edit-contact-form-email').forEach(input => {
    input.addEventListener('focus', async () => {
        existingEmails = await fetchExistingEmails();
        console.log('Focus Event Listener');
    });


    input.addEventListener('input', validateEmail);
});

function validateEmail(event) {

    const emailInput = event.target;
    const email = emailInput.value.trim();
    const emailExists = existingEmails.includes(email);

    // const errorDivId = emailInput.id === 'add-contact-form-email' ? 'add-email-error' : 'edit-email-error';
    // const errorDiv = document.getElementById(errorDivId);

    // if (emailExists) {
    //     errorDiv.textContent = 'This email address is already registered.';
    //     errorDiv.style.display = 'block'; // Fehlermeldung anzeigen
    // } else {
    //     errorDiv.textContent = ''; // Fehlermeldung leeren
    //     errorDiv.style.display = 'none'; // Fehlermeldung ausblenden
    // }


    if (emailExists) {
        emailInput.setCustomValidity('This email address is already registered.');
        // showValidationMessage(emailInput, 'This email address is already registered.');
        console.log('Email already exists:', email);
    } else {
        emailInput.setCustomValidity('');
        // showValidationMessage(emailInput, '');
        console.log('Email is valid:', email);
    }
}

// function showValidationMessage(input, message) {
//     // const errorDivId = input.id === 'add-contact-form-email' ? 'add-email-error' : 'edit-email-error';
//     let errorDivId;
//     if (input.id === 'add-contact-form-email') {
//         errorDivId = 'add-email-error';
//     } else {
//         errorDivId = 'edit-email-error';
//     }

//     const errorDiv = document.getElementById(errorDivId);
//     errorDiv.textContent = message;
// }

document.getElementById('add-contact-form').addEventListener('submit', function (event) {
    const emailInput = document.getElementById('add-contact-form-email');
    const emailExists = existingEmails.includes(emailInput.value.trim());

    if (emailExists) {
        event.preventDefault(); // Prevent form submission
        emailInput.setCustomValidity('This email address is already registered.');
    }
});

document.getElementById('edit-contact-form').addEventListener('submit', function (event) {
    const emailInput = document.getElementById('edit-contact-form-email');
    const emailExists = existingEmails.includes(emailInput.value.trim());

    if (emailExists) {
        event.preventDefault(); // Prevent form submission
        emailInput.setCustomValidity('This email address is already registered.');
    }
});