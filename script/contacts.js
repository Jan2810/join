let colorValues = backgroundColors.map(bg => bg.replace("background: ", ""));

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
    if (window.innerWidth < 800) {
        hideContactsList();
    }
    contactCreatedPopupBg.classList.remove('hide-contact-created-popup');
    setTimeout(function () {
        contactCreatedPopupBg.classList.add('hide-contact-created-popup');
    }, 800);
}

function hideContactsList() {
    contactsContainer.classList.remove('d-flex');
    contactsContainer.classList.add('d-none');
    contactContainer.classList.remove('d-none');
}

async function addNewContact(event) {
    event.preventDefault();
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
        return compareFirstNames(a, b) || compareSurnames(a, b);
    });
}

function compareFirstNames(a, b) {
    let firstNameA = getFirstName(a.name).toUpperCase();
    let firstNameB = getFirstName(b.name).toUpperCase();

    if (firstNameA < firstNameB) {
        return -1;
    }
    if (firstNameA > firstNameB) {
        return 1;
    }
    return 0;
}

function compareSurnames(a, b) {
    let surnameA = getSurname(a.name).toUpperCase();
    let surnameB = getSurname(b.name).toUpperCase();

    if (surnameA < surnameB) {
        return -1;
    }
    if (surnameA > surnameB) {
        return 1;
    }
    return 0;
}

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
}

async function renderContactsList() {
    await new Promise(resolve => setTimeout(resolve, 40));
    let contacts = await processContactsData();
    sortContacts(contacts);

    let contactsByLetter = organizeContactsByLetter(contacts);
    await renderContactsListHtml(contactsByLetter);
}

renderContactsList();

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

function displayNameEmailPhoneForEdit() {
    editName.value = nameEmailPhoneForEdit[2] || '';
    editEmail.value = nameEmailPhoneForEdit[3] || '';
    editPhone.value = nameEmailPhoneForEdit[4] || '';
    editBadge.textContent = nameEmailPhoneForEdit[1] || 'G';
    editBadge.style.backgroundColor = nameEmailPhoneForEdit[0] || '#fff';
}

async function editContact(event) {
    event.preventDefault();
    let contact = [editEmail.value, editName.value, editPhone.value, editBadge.textContent, editBadge.style.backgroundColor]
    if (editName.value.trim() && editEmail.value.trim() && editPhone.value.trim()) {
        contact[3] = updateInitials(contact);
        let contacts = await loadContactsData();
        await updateMatchingContact(contacts, contact);
        await updateContactFrontend(contact);
    }
}

async function updateMatchingContact(contacts, contact) {
    for (let key in contacts) {
        if (contacts[key].name === nameEmailPhoneForEdit[2]) {
            await updateContactBackend(key, contact);
            updateInMemoryContactData(contact);
            break;
        }
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
    profileBadge.textContent = contact[3];
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

function updateInitials(contact) {
    if (contact[1] !== nameEmailPhoneForEdit[2]) {
        let initials = getInitials(contact[1]);
        return initials.substring(0, 3);
    } else {
        return contact[3];
    }
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
    });
    input.addEventListener('input', validateEmail);
});

function validateEmail(event) {
    const emailInput = event.target;
    const email = emailInput.value.trim();
    const emailExists = existingEmails.includes(email);

    if (emailExists) {
        emailInput.setCustomValidity('This email address is already registered.');
    } else {
        emailInput.setCustomValidity('');
    }
}

document.getElementById('add-contact-form').addEventListener('submit', function (event) {
    const emailInput = document.getElementById('add-contact-form-email');
    const emailExists = existingEmails.includes(emailInput.value.trim());

    if (emailExists) {
        event.preventDefault();
        emailInput.setCustomValidity('This email address is already registered.');
    }
});

document.getElementById('edit-contact-form').addEventListener('submit', function (event) {
    const emailInput = document.getElementById('edit-contact-form-email');
    const emailExists = existingEmails.includes(emailInput.value.trim());

    if (emailExists) {
        event.preventDefault();
        emailInput.setCustomValidity('This email address is already registered.');
    }
});

async function fetchFixContacts() {
    for (let fixContact of hardCodedContacts) {
        let color = getRandomContactColor();
        let initials = getInitials(fixContact.name);
        try {
            await postData(CONTACTS_URL, {
                "email": fixContact.email,
                "name": fixContact.name,
                "phone": fixContact.phone,
                "color": color,
                "initials": initials,
                "status": 'normal'
            });
        } catch (error) {
            console.error('Error adding contact:', error);
        }
    }
}
