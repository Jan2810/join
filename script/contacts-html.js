function renderNewContactButton() {
    return /*html*/ `
        <button class="add-new-contact-button" onclick="openAddContactOverlay();">
            <span>Add new contact</span>
            <img class="" src="../assets/icons/add-person.svg" alt="">
        </button>
        <img class="add-person-icon bg-darkblue" id="add-person-icon" onclick="openAddContactOverlay()" src="../assets/icons/add-person.svg" alt="">
    `;
}

/**
 * Renders HTML for a capital letter section.
 * @param {string} capitalLetter - The capital letter to render.
 * @returns {string} - HTML markup for the capital letter section.
 */
function renderCapitalLetter(capitalLetter) {
    return /*html*/ `
        <div class="contacts-list-box">
            <h3>${capitalLetter}</h3>
        </div>
        <div class="contacts-line"></div>
    `;
};

/**
 * Renders HTML for displaying contact information with a profile badge showing initials and background color based on contact.color.
 * @param { Object } contact - The contact object containing name, email, phone, color, and initials properties.
 * @returns { string } HTML markup for displaying contact information.
 */
function renderContact(contact) {
    let contactClass = contact.status === 'new' ? 'contacts-view-contact' : '';

    return /*html*/ `
        <div class="contacts-list-box contacts-list-box-entry ${contactClass}" onclick="showSingleContactView(this, '${contact.color}', '${contact.initials}', '${contact.name}', '${contact.email}', '${contact.phone}')">
            <div class="contacts-profile-badge flex-center" style="background-color: ${contact.color};">${contact.initials}</div>
            <div>
                <p>${contact.name}</p>
                <div class="contacts-email color-lightblue">${contact.email}</div>
            </div>
        </div>                
    `;
};

document.addEventListener('click', function (event) {
    contactsList.querySelectorAll('.contacts-view-contact').forEach(element => {
        element.classList.remove('contacts-view-contact');

    });
});








// if (contact.status === 'new') {
// console.log(contact.id);
// console.log(contact.color);
// console.log(contact.email);
// console.log(contact.initials);
// console.log(contact.name);
// console.log(contact.phone);
// console.log(contact.status);
// await putData(url = CONTACTS_URL + contact.id + ".json", {
//     "color": contact.color,
//     "email": contact.email,
//     "initials": contact.initials,
//     "name": contact.name,
//     "phone": contact.phone,
//     "status": 'normal'
// }
// );
// }

/* <div class="contacts-list-box">
                    <h3>A</h3>
                </div>
                <div class="contacts-line"></div>
                <div class="contacts-list-box contacts-list-box-entry">
                    <div class="contacts-profile-badge bg-red flex-center">AM</div>
                    <div>
                        <p>Anton Mayer</p>
                        <div class="contacts-email color-lightblue">antonaloisbrunnmayer&#8203;@gmail.com</div>
                    </div>
                </div>
                <div class="contacts-list-box contacts-list-box-entry contacts-view-contact">
                    <div class="contacts-profile-badge bg-darkblue flex-center">AS</div>
                    <div>
                        <p>Anja Schulz</p>
                        <div class="contacts-email color-lightblue">anja_maria_anette-weigruber-schulz@hotmail.com</div>
                    </div>
                </div>
                <div class="contacts-list-box">
                    <h3>B</h3>
                </div>
                <div class="contacts-line"></div>
                <div class="contacts-list-box contacts-list-box-entry">
                    <div class="contacts-profile-badge bg-darkblue flex-center">AS</div>
                    <div>
                        <p>Anja Schulz</p>
                        <div class="contacts-email color-lightblue">anja_maria_anette-weigruber-schulz@hotmail.com</div>
                    </div>
                </div>
                <div class="contacts-list-box">
                    <h3>C</h3>
                </div>
                <div class="contacts-line"></div>
                <div class="contacts-list-box contacts-list-box-entry contacts-view-contact">
                    <div class="contacts-profile-badge bg-red flex-center">AM</div>
                    <div>
                        <p>Anton Mayer</p>
                        <div class="contacts-email color-lightblue">anton_mayer&#8203;@gmail.com</div>
                    </div>
                </div>
                <div class="contacts-list-box contacts-list-box-entry">
                    <div class="contacts-profile-badge bg-red flex-center">AM</div>
                    <div>
                        <p>Anton Mayer</p>
                        <div class="contacts-email color-lightblue">antonaloisbrunnmayer&#8203;@gmail.com</div>
                    </div>
                </div>
                <div class="contacts-list-box contacts-list-box-entry">
                    <div class="contacts-profile-badge bg-darkblue flex-center">AS</div>
                    <div>
                        <p>Anja Schulz</p>
                        <div class="contacts-email color-lightblue">anja_maria_anette-weigruber-schulz@hotmail.com</div>
                    </div>
                </div>
                <div class="contacts-list-box">
                    <h3>D</h3>
                </div>
                <div class="contacts-line"></div>
                <div class="contacts-list-box contacts-list-box-entry">
                    <div class="contacts-profile-badge bg-red flex-center">AM</div>
                    <div>
                        <p>Anton Mayer</p>
                        <div class="contacts-email color-lightblue">antonaloisbrunnmayer&#8203;@gmail.com</div>
                    </div>
                </div>
                <div class="contacts-list-box contacts-list-box-entry">
                    <div class="contacts-profile-badge bg-red flex-center">AM</div>
                    <div>
                        <p>Anton Mayer</p>
                        <div class="contacts-email color-lightblue">antonaloisbrunnmayer&#8203;@gmail.com</div>
                    </div>
                </div>
                <div class="contacts-line"></div>
                <div class="contacts-list-box contacts-list-box-entry">
                    <div class="contacts-profile-badge bg-red flex-center">AM</div>
                    <div>
                        <p>Anton Anton Anton Mayer</p>
                        <div class="contacts-email color-lightblue">antonaloisbrunnmayer&#8203;@gmail.com</div>
                    </div>
                </div>
                <div class="contacts-list-box contacts-list-box-entry">
                    <div class="contacts-profile-badge bg-red flex-center">AM</div>
                    <div>
                        <p>Anton Anton Anton Anton Mayer</p>
                        <div class="contacts-email color-lightblue">antonaloisbrunnmayer&#8203;@gmail.com</div>
                    </div>
                </div>
                <div class="contacts-line"></div>
                <div class="contacts-list-box contacts-list-box-entry">
                    <div class="contacts-profile-badge bg-red flex-center">AM</div>
                    <div>
                        <p>Antonnnnnnnnnnnnnnnnn Mayer</p>
                        <div class="contacts-email color-lightblue">antonaloisbrunnmayer&#8203;@gmail.com</div>
                    </div>
                </div>
                <div class="contacts-list-box contacts-list-box-entry">
                    <div class="contacts-profile-badge bg-red flex-center">AM</div>
                    <div>
                        <p>Anton Mayer</p>
                        <div class="contacts-email color-lightblue">antonaloisbrunnmayer&#8203;@gmail.com</div>
                    </div>
                </div>
                <div class="contacts-line"></div>
                <div class="contacts-list-box contacts-list-box-entry">
                    <div class="contacts-profile-badge bg-red flex-center">AM</div>
                    <div>
                        <p>Anton Mayer</p>
                        <div class="contacts-email color-lightblue">antonaloisbrunnmayer&#8203;@gmail.com</div>
                    </div>
                </div>
                <div class="contacts-list-box contacts-list-box-entry">
                    <div class="contacts-profile-badge bg-red flex-center">AM</div>
                    <div>
                        <p>Anton Mayer</p>
                        <div class="contacts-email color-lightblue">antonaloisbrunnmayer&#8203;@gmail.com</div>
                    </div>
                </div>
                <div class="contacts-line"></div>
                <div class="contacts-list-box contacts-list-box-entry">
                    <div class="contacts-profile-badge bg-red flex-center">AM</div>
                    <div>
                        <p>Anton Mayer</p>
                        <div class="contacts-email color-lightblue">antonaloisbrunnmayer&#8203;@gmail.com</div>
                    </div>
                </div>
                <div class="contacts-list-box contacts-list-box-entry">
                    <div class="contacts-profile-badge bg-red flex-center">AM</div>
                    <div>
                        <p>Anton Mayer</p>
                        <div class="contacts-email color-lightblue">antonaloisbrunnmayer&#8203;@gmail.com</div>
                    </div>
                </div> */