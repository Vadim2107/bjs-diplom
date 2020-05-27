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
            moneyManager.setMessage(response.success, 'Баланс успешно пополнен!!!');
        } else {
            moneyManager.setMessage(response.success, response.data);
        }
    });
}

moneyManager.conversionMoneyCallback = function(data) {
    ApiConnector.convertMoney(data, response => {        
        if (response.success) {            
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, 'Конвертирование валюты успешно выполнено!');
        } else {
            moneyManager.setMessage(response.success, response.data);
        }
    });
}

moneyManager.sendMoneyCallback = function(data) {
    ApiConnector.transferMoney(data, response => {        
        if (response.success) {            
            ProfileWidget.showProfile(response.data);            
            moneyManager.setMessage(response.success, 'Перевод успешно выполнен!');            
        } else {
            moneyManager.setMessage(response.success, response.data);
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
        if (response.success) {            
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);            
            moneyManager.setMessage(response.success, 'Пользователь добавлен в список избранных!');
        } else {
            moneyManager.setMessage(response.success, response.data);
        }
    });
}

favoritesWidget.removeUserCallback = function(data) {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {            
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);            
            moneyManager.setMessage(response.success, 'Пользователь удалён из списка избранных!');
        } else {
            moneyManager.setMessage(response.success, response.data);
        }
    });
}