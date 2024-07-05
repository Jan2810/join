/**
 * Array of color values extracted from background colors.
 * @type { Array < string >}
 */
let colorValues = backgroundColors.map(bg => bg.replace("background: ", ""));

/**
 * Returns a random color value from the colorValues array.
 * @returns {string} A random color value.
 */
function getRandomContactColor() {
    let colorIndex = Math.floor(Math.random() * colorValues.length);
    return colorValues[colorIndex];
}

/**
 * Displays a popup indicating a contact has been created.
 * @param {Event} event - The event object.
 */
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

/**
 * Hides the contacts list and displays the single contact container.
 */
function hideContactsList() {
    contactsContainer.classList.remove('d-flex');
    contactsContainer.classList.add('d-none');
    contactContainer.classList.remove('d-none');
}

/**
 * Adds a new contact with a random color and initials.
 * @param {Event} event - The event object.
 */
async function addNewContact(event) {
    event.preventDefault();
    let color = getRandomContactColor();
    let initials = getInitials(addContactFormName.value);
    initials = initials.substring(0, 3);
    await addNewContactBackend(color, initials);
}

/**
 * Adds a new contact to the backend.
 * @param {string} color - The color of the contact.
 * @param {string} initials - The initials of the contact.
 */
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

/**
 * Adds a new contact to the frontend.
 * @param {Object} newContact - The new contact object.
 */
async function addNewContactFrontend(newContact) {
    await renderContactsList();
    showSingleContactView(null, newContact.color, newContact.initials, newContact.name, newContact.email, newContact.phone);
    clearInput();
}

/**
 * Clears the input fields for adding a contact.
 */
function clearInput() {
    addContactFormEmail.value = '';
    addContactFormName.value = '';
    addContactFormPhone.value = '';
}

/**
 * Loads contact data from the server.
 * @returns {Promise<Object>} The contact data from the server.
 */
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

/**
 * Processes the loaded contact data and returns an array of contacts.
 * @returns {Promise<Array<Object>>} The processed contact data.
 */
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

/**
 * Extracts the first name from a full name string.
 * @param {string} fullName - The full name string.
 * @returns {string} The first name.
 */
function getFirstName(fullName) {
    return fullName.split(' ')[0];
}

/**
 * Extracts the surname from a full name string.
 * @param {string} fullName - The full name string.
 * @returns {string} The surname.
 */
function getSurname(fullName) {
    let surname = fullName.split(' ')[1] || '';
    return surname;
}

/**
 * Sorts an array of contacts by first name and surname.
 * @param {Array<Object>} contacts - The array of contacts to sort.
 */
function sortContacts(contacts) {
    contacts.sort((a, b) => {
        return compareFirstNames(a, b) || compareSurnames(a, b);
    });
}

/**
 * Compares the first names of two contacts.
 * @param {Object} a - The first contact object.
 * @param {Object} b - The second contact object.
 * @returns {number} Comparison result.
 */
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

/**
 * Compares the surnames of two contacts.
 * @param {Object} a - The first contact object.
 * @param {Object} b - The second contact object.
 * @returns {number} Comparison result.
 */
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

/**
 * Organizes contacts by the first letter of their first name.
 * @param {Array<Object>} contacts - The array of contacts.
 * @returns {Object} An object with contacts organized by letter.
 */
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

/**
 * Renders the HTML for the contact list organized by letter.
 * @param {Object} contactsByLetter - An object with contacts organized by letter.
 */
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

/**
 * Renders the complete contacts list.
 */
async function renderContactsList() {
    await new Promise(resolve => setTimeout(resolve, 40));
    let contacts = await processContactsData();
    sortContacts(contacts);

    let contactsByLetter = organizeContactsByLetter(contacts);
    await renderContactsListHtml(contactsByLetter);
}

renderContactsList();

/**
 * Displays the detailed view of a single contact.
 * @param {HTMLElement} selectedContact - The selected contact element.
 * @param {string} color - The color of the contact.
 * @param {string} initials - The initials of the contact.
 * @param {string} name - The name of the contact.
 * @param {string} email - The email of the contact.
 * @param {string} phone - The phone number of the contact.
 */
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

/**
 * Prepares to highlight the selected contact.
 * @param {HTMLElement} selectedContact - The selected contact element.
 * @param {string} email - The email of the contact.
 */
function prepareToHighlightContact(selectedContact, email) {
    if (selectedContact) {
        highlightContact(selectedContact);
    } else {
        findAndHighlightContact(email);
    }
}

/**
 * Highlights the selected contact element.
 * @param {HTMLElement} selectedContact - The selected contact element.
 */
function highlightContact(selectedContact) {
    removeViewedContactClass();
    selectedContact.classList.add('viewed-contact');
    if (window.innerWidth < 1120) {
        showSingleContactOnly();
    }
}

/**
 * Finds and highlights the contact with the specified email.
 * @param {string} email - The email of the contact.
 */
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

/**
 * Displays the current contact's details in the edit form.
    * Populates the name, email, phone, initials, and color fields.
 */
function displayNameEmailPhoneForEdit() {
    editName.value = nameEmailPhoneForEdit[2] || '';
    editEmail.value = nameEmailPhoneForEdit[3] || '';
    editPhone.value = nameEmailPhoneForEdit[4] || '';
    editBadge.textContent = nameEmailPhoneForEdit[1] || 'G';
    editBadge.style.backgroundColor = nameEmailPhoneForEdit[0] || '#fff';
}

/**
 * Handles the contact edit form submission.
 * Updates the contact details both in the backend and frontend.
 * 
 * @param {Event} event - The form submission event.
 */
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

/**
 * Finds and updates the matching contact in the backend.
 * 
 * @param {Object} contacts - The contacts data.
 * @param {Array} contact - The contact details array.
 */
async function updateMatchingContact(contacts, contact) {
    for (let key in contacts) {
        if (contacts[key].name === nameEmailPhoneForEdit[2]) {
            await updateContactBackend(key, contact);
            updateInMemoryContactData(contact);
            break;
        }
    }
}

/**
 * Sends a PUT request to update the contact details in the backend.
 * 
 * @param {string} key - The contact's unique key.
 * @param {Array} contact - The contact details array.
 */
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

/**
 * Closes the edit contact overlay without a transition effect.
 */
function closeOverlayAfterEditWithoutTransition() {
    editContactsOverlayBg.classList.remove('edit-contacts-overlay-bg-transition');
    closeEditContactOverlay();
    setTimeout(() => {
        editContactsOverlayBg.classList.add('edit-contacts-overlay-bg-transition');
    }, 10);
}

/**
 * Updates the contact details in the frontend.
 * 
 * @param {Array} contact - The contact details array.
 */
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

/**
 * Updates the in-memory contact data after editing.
 * 
 * @param {Array} contact - The contact details array.
 */
function updateInMemoryContactData(contact) {
    nameEmailPhoneForEdit = [
        contact[4], // backgroundColor
        contact[3], // initials
        contact[1], // name
        contact[0], // email
        contact[2]  // phone
    ];
}

/**
 * Updates the initials if the contact's name has changed.
 * 
 * @param {Array} contact - The contact details array.
 * @returns {string} - The updated initials.
 */
function updateInitials(contact) {
    if (contact[1] !== nameEmailPhoneForEdit[2]) {
        let initials = getInitials(contact[1]);
        return initials.substring(0, 3);
    } else {
        return contact[3];
    }
}

/**
 * Deletes the contact from the backend.
 */
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

/**
 * Deletes the contact from the frontend and updates the UI.
 */
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

/**
 * Fetches existing email addresses from the contacts data.
 * 
 * @returns {Array} - The array of existing email addresses.
 */
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

// Adds event listeners to email input fields for validation
document.querySelectorAll('.add-contact-form-email, .edit-contact-form-email').forEach(input => {
    input.addEventListener('focus', async () => {
        existingEmails = await fetchExistingEmails();
    });
    input.addEventListener('input', validateEmail);
});

/**
 * Validates the email input to check if it already exists.
 * 
 * @param {Event} event - The input event.
 */
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

// Adds event listeners to the contact forms for email validation
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

/**
 * Adds predefined contacts to the backend.
 */
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
