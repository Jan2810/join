let addContactFormName = document.getElementById('add-contact-form-name');
let addContactFormEmail = document.getElementById('add-contact-form-email');
let addContactFormPhone = document.getElementById('add-contact-form-phone');

let colorValues = backgroundColors.map(bg => bg.replace("background: ", ""));

function getRandomContactColor() {
    let colorIndex = Math.floor(Math.random() * colorValues.length);
    return colorValues[colorIndex];
}

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

function setRandomNumber() {
    let number = Math.random();
    number = number.toFixed(2) * 14;
    number = Math.floor(number);
    return number;
};

function getRandomContactColor() {
    let colorIndex = Math.floor(Math.random() * colorValues.length);
    return colorValues[colorIndex];
}

function displayContactCreatedPopup(event) {
    event.preventDefault();
    closeAddContactOverlay();

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
}

function updateNewContactDetails(contact) {
    document.querySelector('.single-contact-badge-and-name').style.display = 'flex';
    document.querySelector('.single-contact-profile-badge').style.backgroundColor = contact.color;
    document.querySelector('.single-contact-profile-badge').textContent = contact.initials;
    document.querySelector('.single-contact-name').textContent = contact.name;
    document.querySelector('.single-contact-link').href = `mailto:${contact.email}`;
    document.querySelector('.single-contact-link').textContent = contact.email;
    document.querySelector('.single-contact-information').classList.remove('d-none');
    document.querySelector('.single-contact-phone').textContent = contact.phone;
}

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
}

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
}



async function renderContactsList() {
    let contacts = await processContactsData();
    sortContacts(contacts);

    let contactsByLetter = organizeContactsByLetter(contacts);

    await renderContactsListHtml(contactsByLetter);
};

renderContactsList();

