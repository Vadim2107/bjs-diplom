'use strict';

const userForm = new UserForm();
userForm.loginFormCallback = function (data) {
    ApiConnector.login(data.login, data.password, response => console.log(response));
}

userForm.registerFormCallback = function (data) {
    ApiConnector.login(data.login, data.password, response => console.log(response));
}