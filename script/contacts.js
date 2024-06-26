async function loadContacts(path = "") {
    let response = await fetch(CONTACTS_URL + "/users.json");
    let responseAsJson = await response.json();
    let entriesArray = [];
    if (responseAsJson) {
        entriesArray = Object.values(responseAsJson);
    }
    console.log(entriesArray);
    return entriesArray;

}

loadContacts();


async function saveContact() {
    await postContact('', {
        "name": "Harry White",
        "email": "harry_white@outlook.com",
        "password": "secretpassword"
    });
}

saveContact();

async function postContact(path = '', contact = {}) {
    let response = await fetch(CONTACTS_URL + path + ".json", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
    });
    return await response.json();
}