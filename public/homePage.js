'use strict';

let logoutButton = new LogoutButton();
let ratesBoard = new RatesBoard();
let moneyManager = new MoneyManager();
let favoritesWidget = new FavoritesWidget();

logoutButton.action = function() {
    ApiConnector.logout(response => {        
        if (response.success) {        
            location.reload();
        } 
    });
}

ApiConnector.current(response => {        
    if (response.success) {        
        ProfileWidget.showProfile(response.data);
    } 
});

let updateStocks = () => ApiConnector.getStocks(response => {        
    if (response.success) {        
        ratesBoard.clearTable();
        ratesBoard.fillTable(response.data);        
    } 
});

updateStocks();
setInterval(updateStocks, 60000);

moneyManager.addMoneyCallback = function(data) {
    ApiConnector.addMoney(data, response => {        
        if (response.success) {            
            ProfileWidget.showProfile(response.data);
            let message = 'Баланс успешно пополнен!!!';
            moneyManager.setMessage(response.success, message);
        } else {
            moneyManager.setMessage(!response.success, response.data);
        }
    });
}

moneyManager.conversionMoneyCallback = function(data) {
    ApiConnector.convertMoney(data, response => {        
        if (response.success) {            
            ProfileWidget.showProfile(response.data);
            let message = 'Конвертирование валюты успешно выполнено!';
            moneyManager.setMessage(response.success, message);
        } else {
            moneyManager.setMessage(!response.success, response.data);
        }
    });
}

moneyManager.sendMoneyCallback = function(data) {
    ApiConnector.transferMoney(data, response => {        
        if (response.success) {            
            ProfileWidget.showProfile(response.data);
            let message = 'Перевод успешно выполнен!';
            moneyManager.setMessage(response.success, message);
        } else {
            moneyManager.setMessage(!response.success, response.data);
        }
    });
}

ApiConnector.getFavorites(response => {        
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
});

favoritesWidget.addUserCallback = function(data) {
    ApiConnector.addUserToFavorites(data, response => {
        if (!response.success) {            
            moneyManager.setMessage(!response.success, response.data);
        } else {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            // let message = 'Пользователь добавлен в список избранных!';
            moneyManager.setMessage(response.success, 'Пользователь добавлен в список избранных!');
        }
    });
}

favoritesWidget.removeUserCallback = function(data) {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {            
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            // let message = 'Пользователь удалён из списка избранных!';
            moneyManager.setMessage(response.success, 'Пользователь удалён из списка избранных!');
        } else {
            moneyManager.setMessage(!response.success, response.data);
        }
    });
}