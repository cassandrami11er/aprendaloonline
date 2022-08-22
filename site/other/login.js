    //Validation code for the login page

var username = document.forms['loginForm']['username'];
var password = document.forms['loginForm']['password'];

var usernameError = document.getElementById('usernameError');
var passwordError = document.getElementById('passwordError');

username.addEventListener('textInput', usernameVerify);
password.addEventListener('textInput', passwordVerify);

function validate() {
    var good = true;
    if (username.value.length < 8) {
        username.style.border = "1px solid red"
        usernameError.style.display = "block"
        good = false;
    }

    if (password.value.length < 8) {
        password.style.border = "1px solid red"
        passwordError.style.display = "block"
        good = false;
    }

    return good;
}

function usernameVerify() {
    if (username.value.length >= 8) {
        usernameError.style.display = "none"
        return true;
    }
}

function passwordVerify() {
    if (password.value.length >= 8) {
        password.style.display = "none"
        return true;
    }
}