// =================================Creating login=====================================

// function just_clicked() {

let login_value = document.getElementById('login_btn');
login_value.addEventListener("click", async function (event) {
    event.preventDefault()
    let email = document.getElementById('loginName');
    let password = document.getElementById('loginPassword');

    let userObj = {
        email: email.value,
        password: password.value,
    };

    // console.log()
    console.log(userObj);

    fetch('http://localhost:6969/users/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify(userObj),
    }).then((res) => {
        return res.json();
    }).then((data) => {
        console.log(data);
        localStorage.setItem('Token', data.token)
        alert(data.Message)
    }).catch((error) => {
        console.log({ 'error': error })
    })


});

// }
// =====================================Creating registeration====================================
// function register() {

let registeration_form = document.getElementById('register_btn');
registeration_form.addEventListener('click', async (event) => {
    event.preventDefault();
    let username = document.getElementById('registerUsername');
    let email = document.getElementById('registerEmail');
    let name = document.getElementById('registerName');
    let password = document.getElementById('registerPassword');
    let repeat_password = document.getElementById('registerRepeatPassword');

    let userObject = {
        username: username.value,
        email: email.value,
        name: name.value,
        password: password.value,
        repeat_password: repeat_password.value,
    }
    console.log(userObject)

    fetch('http://localhost:6969/users/register', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userObject),
    }).then((res) => {
        return res.json();
    }).then((data) => {
        alert(data.Message);
        console.log(data);
    }).catch((error) => {
        console.log({ 'error': error })
    })

})



// }