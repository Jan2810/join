let contactsList = document.getElementById('contacts-list');
let contactsContainer = document.getElementById('contacts-container');
let contactContainer = document.getElementById('single-contact-container');
let editContactsOverlayBg = document.getElementById('edit-contacts-overlay-bg');
let addContactsOverlayBg = document.getElementById('add-contacts-overlay-bg');
let editContactOverlay = document.getElementById('overlay-edit-contact');
let addContactOverlay = document.getElementById('overlay-add-contact');
let contactCreatedPopupBg = document.getElementById('contact-created-popup-bg');
let editDeletePopup = document.getElementById('edit-delete-popup');
let singleContactTripleDots = document.getElementById('single-contact-triple-dots');
let addPersonIcon = document.getElementById('add-person-icon');
let manuallyRemoved = false;

function closeEditContactOverlay() {
    editContactsOverlayBg.classList.add('hide-edit-contact-overlay');
    editContactOverlay.classList.add('hide-edit-contact-overlay');
}

function openEditContactOverlay() {
    editContactsOverlayBg.classList.remove('hide-edit-contact-overlay');
    editContactOverlay.classList.remove('hide-edit-contact-overlay');
    editDeletePopup.classList.add('hide-edit-delete-popup');
    singleContactTripleDots.classList.remove('d-none');
    addPersonIcon.classList.remove('d-none');
}

function closeAddContactOverlay() {
    addContactsOverlayBg.classList.add('hide-add-contact-overlay');
    addContactOverlay.classList.add('hide-add-contact-overlay');
}

function openAddContactOverlay() {
    addContactsOverlayBg.classList.remove('hide-add-contact-overlay');
    addContactOverlay.classList.remove('hide-add-contact-overlay');
}

/**
 * Displays a "Contact successfully created" popup for 1500ms.
 * 
 * Prevents the default form submission, closes the add contact overlay,
 * and shows the success message.The message is hidden again after 1500ms.
 * 
 * @param { Event } event - The form submission event.
 */
function displayContactCreatedPopup(event) {
    event.preventDefault();
    closeAddContactOverlay()
    contactCreatedPopupBg.classList.remove('hide-contact-created-popup');
    contactsContainer.classList.remove('d-flex');
    contactsContainer.classList.add('d-none');
    contactContainer.classList.remove('d-none');
    manuallyRemoved = true;
    setTimeout(function () {
        contactCreatedPopupBg.classList.add('hide-contact-created-popup');
    }, 800);
}

/**
 * Handles the window resize event to toggle the visibility of the contactContainer.
 * Removes 'd-none' if window width is 1120px or greater.
 * Adds 'd-none' if window width is less than 1120px, unless manually removed.
 */
function handleResize() {
    if (window.innerWidth >= 1120) {
        contactContainer.classList.remove('d-none');
        contactsContainer.classList.remove('d-none');
        contactsContainer.classList.add('d-flex');
        manuallyRemoved = false;
    } else if (!manuallyRemoved) {
        contactContainer.classList.add('d-none');
    }
}

/**
* Handles the click event on the contact-arrow-left element.
 * Shows the contactsContainer and hides the contactContainer if the window width is less than 1120px.
 */
function returnToContactsList() {
    contactsContainer.classList.add('d-flex');
    contactsContainer.classList.remove('d-none');

    if (window.innerWidth < 1120) {
        contactContainer.classList.add('d-none');
        manuallyRemoved = false; // Reset the flag
    }
}

// Add event listener for window resize
window.addEventListener('resize', handleResize);

function displayEditDeletePopup() {
    editDeletePopup.classList.remove('hide-edit-delete-popup');
    setTimeout(function () {
        singleContactTripleDots.classList.add('d-none');
        addPersonIcon.classList.add('d-none');
    }, 100);
}

function doNotClose(event) {
    event.stopPropagation();
}

function hideEditDeletePopup() {
    editDeletePopup.classList.add('hide-edit-delete-popup');
    setTimeout(function () {
        singleContactTripleDots.classList.remove('d-none');
        addPersonIcon.classList.remove('d-none');
    }, 125);
}