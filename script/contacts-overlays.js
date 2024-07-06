let contactsList = document.getElementById('contacts-list');
let contactsContainer = document.getElementById('contacts-container');

let contactContainer = document.getElementById('single-contact-container');
let windowBg = document.getElementById('window-bg');
let editContactsOverlayBg = document.getElementById('edit-contacts-overlay-bg');
let addContactsOverlayBg = document.getElementById('add-contacts-overlay-bg');
let editContactOverlay = document.getElementById('overlay-edit-contact');
let addContactOverlay = document.getElementById('overlay-add-contact');

let contactCreatedPopupBg = document.getElementById('contact-created-popup-bg');
let editDeletePopup = document.getElementById('edit-delete-popup');
let singleContactTripleDots = document.getElementById('single-contact-triple-dots');
let addPersonIcon = document.getElementById('add-person-icon');

let nameEmailPhoneForEdit = [];

let editName = document.getElementById('edit-contact-form-name');
let editEmail = document.getElementById('edit-contact-form-email');
let editPhone = document.getElementById('edit-contact-form-phone');
let editBadge = document.getElementById('edit-contact-profile-badge');

let addContactFormName = document.getElementById('add-contact-form-name');
let addContactFormEmail = document.getElementById('add-contact-form-email');
let addContactFormPhone = document.getElementById('add-contact-form-phone');

const badgeAndName = document.querySelector('.single-contact-badge-and-name');
const profileBadge = document.querySelector('.single-contact-profile-badge');
const contactName = document.querySelector('.single-contact-name');
const contactLink = document.querySelector('.single-contact-link');
const contactInformation = document.querySelector('.single-contact-information');
const contactPhone = document.querySelector('.single-contact-phone');

/**
 * Initializes the contacts by including HTML and setting the background.
 */
async function initContacts() {
    await includeHTML();
    setBackground(3);
}

/**
 * Opens the edit contact overlay.
 */
function openEditContactOverlay() {
    windowBg.classList.remove('d-none');
    setTimeout(() => {
        windowBg.classList.add('visible');
    }, 10);
    editContactsOverlayBg.classList.remove('hide-edit-contact-overlay');
    if (window.innerWidth < 800) {
        hideEditDeletePopup();
    }
    displayNameEmailPhoneForEdit();
}

/**
 * Hides the edit/delete popup.
 */
function hideEditDeletePopup() {
    editDeletePopup.classList.add('hide-edit-delete-popup');
    singleContactTripleDots.classList.remove('d-none');
    addPersonIcon.classList.remove('d-none');
}

/**
 * Closes the edit contact overlay.
 */
function closeEditContactOverlay() {
    editContactsOverlayBg.classList.add('hide-edit-contact-overlay');
    windowBg.classList.remove('visible');
    setTimeout(() => {
        windowBg.classList.add('d-none');
    }, 300);

}

/**
 * Closes the add contact overlay and clears the input fields.
 */
function closeAddContactOverlay() {
    addContactsOverlayBg.classList.add('hide-add-contact-overlay');
    windowBg.classList.remove('visible');
    setTimeout(() => {
        windowBg.classList.add('d-none');
    }, 300);
    clearInput();
}

/**
 * Opens the add contact overlay.
 */
function openAddContactOverlay() {
    windowBg.classList.remove('d-none');
    setTimeout(() => {
        windowBg.classList.add('visible');
    }, 10);
    addContactsOverlayBg.classList.remove('hide-add-contact-overlay');
}

/**
 * Closes the single contact view.
 */
function closeContactView() {
    badgeAndName.style.display = 'none';
    contactInformation.classList.add('d-none');
    removeViewedContactClass()
}

/**
 * Removes the 'viewed-contact' class from all contacts.
 */
function removeViewedContactClass() {
    contactsList.querySelectorAll('.viewed-contact').forEach(element => {
        element.classList.remove('viewed-contact');
    });
}

/**
 * Handles window resize events to adjust the contact view layout.
 */
function handleResize() {
    if (window.innerWidth >= 1120) {
        contactContainer.classList.remove('d-none');
        contactsContainer.classList.remove('d-none');
        contactsContainer.classList.add('d-flex');
    } else if (window.innerWidth < 1120 && badgeAndName.style.display === 'flex') {
        showSingleContactOnly();
    } else if (window.innerWidth < 1120 && badgeAndName.style.display !== 'flex') {
        returnToContactsList();
    }
}

/**
 * Shows only the single contact view.
 */
function showSingleContactOnly() {
    contactContainer.classList.remove('d-none');
    contactContainer.classList.add('d-block');
    contactsContainer.classList.remove('d-flex');
    contactsContainer.classList.add('d-none');
}

/**
 * Returns to the contacts list view from the single contact view.
 */
function returnToContactsList() {
    contactsContainer.classList.add('d-flex');
    contactsContainer.classList.remove('d-none');
    contactContainer.classList.remove('d-block');
    contactContainer.classList.add('d-none');
    closeContactView();
}

window.addEventListener('resize', handleResize);

handleResize();

/**
 * Displays the edit/delete popup.
 */
function displayEditDeletePopup() {
    editDeletePopup.classList.remove('hide-edit-delete-popup');
    setTimeout(function () {
        singleContactTripleDots.classList.add('d-none');
        if (addPersonIcon) {
            addPersonIcon.classList.add('d-none');
        }
    }, 100);
}

/**
 * Prevents the event from propagating and closing the popup.
 * @param {Event} event - The event object.
 */
function doNotClose(event) {
    event.stopPropagation();
}

/**
 * Hides the edit/delete popup on small screens.
 */
function hideEditDeletePopup() {
    if (window.innerWidth < 1200) {
        editDeletePopup.classList.add('hide-edit-delete-popup');
        setTimeout(function () {
            singleContactTripleDots.classList.remove('d-none');
            if (addPersonIcon) {
                addPersonIcon.classList.remove('d-none');
            }
        }, 125);
    }

}

/**
 * Handles the popup for editing or deleting a contact.
 */
function popupDeleteContact() {
    hideEditDeletePopup();
    returnToContactsList();
}