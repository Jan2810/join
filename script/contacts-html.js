function renderNewContactButton() {
    return /*html*/ `
        <button class="add-new-contact-button" onclick="openAddContactOverlay();">
            <span>Add new contact</span>
            <img class="" src="../assets/icons/add-person.svg" alt="">
        </button>
        <img class="add-person-icon bg-darkblue" id="add-person-icon" onclick="openAddContactOverlay()" src="../assets/icons/add-person.svg" alt="">
    `;
}

function renderCapitalLetter(capitalLetter) {
    return /*html*/ `
        <div class="contacts-list-box">
            <h3>${capitalLetter}</h3>
        </div>
        <div class="contacts-line"></div>
    `;
};

function renderContact(contact) {
    return /*html*/ `
        <div class="contacts-list-box contacts-list-box-entry" onclick="showSingleContactView(this, '${contact.color}', '${contact.initials}', '${contact.name}', '${contact.email}', '${contact.phone}')">
            <div class="contacts-profile-badge flex-center" style="background-color: ${contact.color};">${contact.initials}</div>
            <div class="contacts-list-name-and-email">
                <p>${contact.name}</p>
                <div class="contacts-email color-lightblue">${contact.email}</div>
            </div>
        </div>                
    `;
};