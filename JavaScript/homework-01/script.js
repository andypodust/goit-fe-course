'use strict'

const ADMIN_LOGIN = 'admin';

const ADMIN_PASSWORD = 'm4ngo1zh4ackz0r';

const CANCEL_BY_USER ='Отменено пользователем!';

const ACCES_DENIED = 'Доступ запрещен!';

const WELCOME = 'Добро пожаловать!'

let userLogin;

let userPassword;


userLogin = prompt ('Введите логин')
if (userLogin === ADMIN_LOGIN) {
    userPassword = prompt ('Введите пароль');
    if (userPassword === ADMIN_PASSWORD) {
        alert (WELCOME);
    } else if (userPassword === null) {
        alert(CANCEL_BY_USER);
    } else {
        alert(ACCES_DENIED)
    }
    
} else if (userLogin === null) {
    alert(CANCEL_BY_USER);
} else {
    alert(ACCES_DENIED);
} 
    


