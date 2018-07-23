const logins = ["Mango", "robotGoogles", "Poly", "Aj4x1sBozz", "qwerty123"];
let login = prompt("Please enter your login");

function checkLoginValidity (login) {
    if (login.length >= 4 && login.length <= 16) {
        return true
    }
    else {
        return false
    }
}

function checkIfLoginExists (login) {
    if (logins.includes(login)) {
        return true
    } else {
        return false
    }
}

function addlogin (login) {
    if (checkLoginValidity(login) === false) {
        alert ("Error, login must be from 4 to 16 symbols!")
    }
    else if (checkLoginValidity(login) === true) {
        if (checkIfLoginExists(login) === false) {
            logins.push (login)
        } 
        else if (checkIfLoginExists(login) === true) {
            alert ("This login already in use!")
        }

    }
    
}
addlogin (login)
console.log (logins)


