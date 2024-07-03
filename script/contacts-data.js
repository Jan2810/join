let hardCodedContacts = [
    {
        "email": "anna.mueller@example.com",
        "name": "Anna Müller",
        "phone": "+49 151 23456701"
    },
    {
        "email": "markus.schneider@example.com",
        "name": "Markus Schneider",
        "phone": "+49 151 23456702"
    },
    {
        "email": "laura.fischer@example.com",
        "name": "Laura Fischer",
        "phone": "+49 151 23456703"
    },
    {
        "email": "johannes.becker@example.com",
        "name": "Johannes Becker",
        "phone": "+49 151 23456704"
    },
    {
        "email": "sophie.wagner@example.com",
        "name": "Sophie Wagner",
        "phone": "+49 151 23456705"
    },
    {
        "email": "david.schmidt@example.com",
        "name": "David Schmidt",
        "phone": "+49 151 23456706"
    },
    {
        "email": "lea.krause@example.com",
        "name": "Lea Krause",
        "phone": "+49 151 23456707"
    },
    {
        "email": "benjamin.meyer@example.com",
        "name": "Benjamin Meyer",
        "phone": "+49 151 23456708"
    },
    {
        "email": "julia.bauer@example.com",
        "name": "Julia Bauer",
        "phone": "+49 151 23456709"
    },
    {
        "email": "sebastian.weber@example.com",
        "name": "Sebastian Weber",
        "phone": "+49 151 23456710"
    }
];

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


// let backgroundColors = [
//     "background: rgba(255, 122, 0, 1)",
//     "background: rgba(255, 94, 179, 1)",
//     "background: rgba(110, 82, 255, 1)",
//     "background: rgba(147, 39, 255, 1)",
//     "background: rgba(0, 190, 232, 1)",
//     "background: rgba(31, 215, 193, 1)",
//     "background: rgba(255, 116, 94, 1)",
//     "background: rgba(255, 163, 94, 1)",
//     "background: rgba(252, 113, 255, 1)",
//     "background: rgba(255, 199, 1, 1)",
//     "background: rgba(0, 56, 255, 1)",
//     "background: rgba(195, 255, 43, 1)",
//     "background: rgba(255, 230, 43, 1)",
//     "background: rgba(255, 70, 70, 1)",
//     "background: rgba(255, 187, 43, 1)"
// ];