let addContactFormName = document.getElementById('add-contact-form-name');
let addContactFormEmail = document.getElementById('add-contact-form-email');
let addContactFormPhone = document.getElementById('add-contact-form-phone');

let colorValues = backgroundColors.map(bg => bg.replace("background: ", ""));

async function initContacts() {
    await includeHTML();
    setBackground(3);
};

function getRandomContactColor() {
    let colorIndex = Math.floor(Math.random() * colorValues.length);
    return colorValues[colorIndex];
};

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
};

function getRandomContactColor() {
    let colorIndex = Math.floor(Math.random() * colorValues.length);
    return colorValues[colorIndex];
};

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
        manuallyRemoved = true;
    }
    contactCreatedPopupBg.classList.remove('hide-contact-created-popup');
    setTimeout(function () {
        contactCreatedPopupBg.classList.add('hide-contact-created-popup');
    }, 800);
};

function updateNewContactDetails(contact) {
    document.querySelector('.single-contact-badge-and-name').style.display = 'flex';
    document.querySelector('.single-contact-profile-badge').style.backgroundColor = contact.color;
    document.querySelector('.single-contact-profile-badge').textContent = contact.initials;
    document.querySelector('.single-contact-name').textContent = contact.name;
    document.querySelector('.single-contact-link').href = `mailto:${contact.email}`;
    document.querySelector('.single-contact-link').textContent = contact.email;
    document.querySelector('.single-contact-information').classList.remove('d-none');
    document.querySelector('.single-contact-phone').textContent = contact.phone;
};

async function addNewContact() {
    let color = getRandomContactColor();
    let initials = getInitials(addContactFormName.value);
    let newContact = {
        "email": addContactFormEmail.value,
        "name": addContactFormName.value,
        "phone": addContactFormPhone.value,
        "color": color,
        "initials": initials,
        "status": 'new'
    };
    await postData(CONTACTS_URL, newContact);
    renderContactsList();
    updateNewContactDetails(newContact);
    clearInput();
};

function clearInput() {
    addContactFormEmail.value = '';
    addContactFormName.value = '';
    addContactFormPhone.value = ''
        ;
};

async function loadContactsData() {
    let response = await fetch(CONTACTS_URL + ".json");
    let responseAsJson = await response.json();
    return responseAsJson;
};

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
            status: data[key].status
        });
    }
    return contacts;
};

function getFirstName(fullName) {
    return fullName.split(' ')[0];
};

function getSurname(fullName) {
    return fullName.split(' ')[1];
};

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
};

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
};

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
    await updateStatusNew();
};

async function renderContactsList() {
    let contacts = await processContactsData();
    sortContacts(contacts);

    let contactsByLetter = organizeContactsByLetter(contacts);

    await renderContactsListHtml(contactsByLetter);
};

renderContactsList();

async function updateContactStatus(key, newStatus) {
    const url = `${CONTACTS_URL}${key}/status.json`;
    await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newStatus)
    });
}

async function updateStatusNew() {
    const contactsData = await loadContactsData();
    for (let key in contactsData) {
        if (contactsData[key].status) {
            console.log(contactsData[key].status);
        }


        if (contactsData[key].status && contactsData[key].status === 'new') {
            await updateContactStatus(key, 'normal');


        }
    }

}


// Edit contact:

function showSingleContactView(selectedContact, color, initials, name, email, phone) {
    // Cache the DOM elements to avoid querying the DOM multiple times
    const badgeAndName = document.querySelector('.single-contact-badge-and-name');
    const profileBadge = document.querySelector('.single-contact-profile-badge');
    const contactName = document.querySelector('.single-contact-name');
    const contactLink = document.querySelector('.single-contact-link');
    const contactInformation = document.querySelector('.single-contact-information');
    const contactPhone = document.querySelector('.single-contact-phone');

    // Update the DOM elements with the contact details
    badgeAndName.style.display = 'flex';
    profileBadge.style.backgroundColor = color;
    profileBadge.textContent = initials;
    contactName.textContent = name;
    contactLink.href = `mailto:${email}`;
    contactLink.textContent = email;
    contactInformation.classList.remove('d-none');
    contactPhone.textContent = phone;

    removeViewedContactClass();
    selectedContact.classList.add('viewed-contact');

    if (window.innerWidth < 1120) {
        showSingleContactOnly();

    }

}


// addContactsOverlayBg.classList.remove('add-contacts-overlay-bg-transition');

// closeAddContactOverlay();

// setTimeout(() => {
//     addContactsOverlayBg.classList.add('add-contacts-overlay-bg-transition');
// }, 10);
