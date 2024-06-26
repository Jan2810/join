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


function openEditContactOverlay() {
    editContactsOverlayBg.classList.remove('hide-edit-contact-overlay');
    editContactOverlay.classList.remove('hide-edit-contact-overlay');
    editContactsOverlayBg.classList.add('show-edit-contact-overlay');
    editContactOverlay.classList.add('show-edit-contact-overlay');
    if (window.innerWidth < 800) {
        hideEditDeletePopup();
    }
}

function hideEditDeletePopup() {
    editDeletePopup.classList.add('hide-edit-delete-popup');
    singleContactTripleDots.classList.remove('d-none');
    addPersonIcon.classList.remove('d-none');
}

function closeEditContactOverlay() {
    editContactsOverlayBg.classList.remove('show-edit-contact-overlay');
    editContactOverlay.classList.remove('show-edit-contact-overlay');
    editContactsOverlayBg.classList.add('hide-edit-contact-overlay');
    editContactOverlay.classList.add('hide-edit-contact-overlay');
}

function closeAddContactOverlay() {
    addContactsOverlayBg.classList.remove('show-edit-contact-overlay');
    addContactOverlay.classList.remove('show-edit-contact-overlay');
    addContactsOverlayBg.classList.add('hide-add-contact-overlay');
    addContactOverlay.classList.add('hide-add-contact-overlay');
}

function openAddContactOverlay() {
    addContactsOverlayBg.classList.remove('hide-add-contact-overlay');
    addContactOverlay.classList.remove('hide-add-contact-overlay');
    addContactsOverlayBg.classList.add('show-edit-contact-overlay');
    addContactOverlay.classList.add('show-edit-contact-overlay');

}

/**
 * Displays a "Contact successfully created" popup for 1500ms.
 * 
 * Prevents the default form submission, closes the add contact overlay,
 * and shows the success message.The message is hidden again after 1500ms.
 * 
 * @param { Event } event - The form submission event.
 */


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
    if (window.innerWidth < 800) {
        editDeletePopup.classList.add('hide-edit-delete-popup');
        setTimeout(function () {
            singleContactTripleDots.classList.remove('d-none');
            addPersonIcon.classList.remove('d-none');
        }, 125);
    }

}

function popupDeleteContact() {
    hideEditDeletePopup();
    returnToContactsList();
}