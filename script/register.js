async function register() {
    let newUser = {};
    let name = document.getElementById("register-input-name");
    let email = document.getElementById("register-input-email");
    let password = document.getElementById("register-input-password");
    newUser.email = email.value;
    newUser.name = name.value;
    newUser.password = password.value;
    console.log(newUser);
    await postData("", newUser);
    name.value="";
    email.value="";
    password.value="";
}

async function postData(path = "", data = {}) {
    let response = await fetch(USERS_URL + path + ".json", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data)
    });
    return response

}