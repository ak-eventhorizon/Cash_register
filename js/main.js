'use strict';

import {checkCashRegister} from './modules/checkCashRegister.js';

/*************** Check Cash Register ***************/

const payment = {
    content: new Map([
        [100,0],
        [20,0],
        [10,0],
        [5,0],
        [1,0],
        [0.25,0],
        [0.1,0],
        [0.05,0],
        [0.01,0]
    ]),
    sum: function (){
        let result = 0;
    
        function calculateMapElement(value, key, map){
            let multiple = key * map.get(key);
            result += multiple;
        }
        this.content.forEach(calculateMapElement);
        return result.toFixed(2);
    }
};

const change = {
    content: new Map([
        [100,0],
        [20,0],
        [10,0],
        [5,0],
        [1,0],
        [0.25,0],
        [0.1,0],
        [0.05,0],
        [0.01,0]
    ]),
    sum: function (){
        let result = 0;
    
        function calculateMapElement(value, key, map){
            let multiple = key * map.get(key);
            result += multiple;
        }
        this.content.forEach(calculateMapElement);
        return result.toFixed(2);
    }
};

const register = {
    content: new Map([
        [100,10],
        [20,10],
        [10,30],
        [5,30],
        [1,50],
        [0.25,50],
        [0.1,50],
        [0.05,50],
        [0.01,50]
    ]),
    sum: function (){
        let result = 0;
    
        function calculateMapElement(value, key, map){
            let multiple = key * map.get(key);
            result += multiple;
        }
        this.content.forEach(calculateMapElement);
        return result.toFixed(2);
    }
};

const ui = {
    payment: document.querySelector('#payment_field'),
    price: document.querySelector('#price_field'),
    change: document.querySelector('#change_field'),
    status: document.querySelector('#status_field'),

    clientButtons: document.querySelectorAll('div.client_pocket > div.cash > div.cell'),
    mainButton: document.querySelector('#action_button'),

    changeQuantityCells: document.querySelectorAll('div.change div.quantity'),
    registerQuantityCells: document.querySelectorAll('div.cash_register div.quantity'),

    resetPayment: function (){
        this.payment.value = '0.00';
    },
    resetPrice: function (){
        this.price.value = '0.00';
    },
    refreshChangeCells: function(){
        // метод, заполняющий ячейки с количеством купюр change в 
        // соответствии с мапом change
        for (let element of this.changeQuantityCells) {
            let currentRate = +element.id.split('_')[1]; // 100 , 20 .... 0.01
            let currentQuantity = change.content.get(currentRate);

            element.innerHTML = `x${currentQuantity}`;
        }
    },
    refreshRegisterCells: function(){
        // метод, заполняющий ячейки с количеством купюр cash register в 
        // соответствии с мапом register
        for (let element of this.registerQuantityCells) {
            let currentRate = +element.id.split('_')[1]; // 100 , 20 .... 0.01
            let currentQuantity = register.content.get(currentRate);

            element.innerHTML = `x${currentQuantity}`;
        }
    }
};

ui.resetPayment();
ui.resetPrice();

ui.refreshRegisterCells();
ui.refreshChangeCells();



for (let element of ui.clientButtons) {
    element.addEventListener('click', function () {
        // подсчет и вывод поля Payment
        let result = parseFloat(ui.payment.value) + parseFloat(element.innerHTML);
        ui.payment.value = result.toFixed(2);

        // инкремент определенного Map'a из payment.content (плюс одна купюра)
        let currentQuantity = payment.content.get(+element.innerHTML);
        payment.content.set(+element.innerHTML, ++currentQuantity);
    });
}


// main calculate function
// TODO - эта функция в итоге будет вынесена в отдельный модуль - checkCashRegister
function calculateChange() {
    let paymentValue = +parseFloat(ui.payment.value).toFixed(2);
    let priceValue = +parseFloat(ui.price.value).toFixed(2);
    let neededChange = +(paymentValue - priceValue).toFixed(2);

    if (neededChange === 0) {
        ui.status.value = "CHANGE DONT NEEDED (0$)";
    } else if (neededChange < 0){
        ui.status.value = "NOT ENOUGH PAYMENT";
    } else {
        ui.status.value = "CHANGE CALCULATED";
        // тут считается сдача
    }

    console.log(`Payment value: ${paymentValue}`);
    console.log(`Price value: ${priceValue}`);
    console.log(`Needed Change: ${neededChange}`);
}


// debugging console info
// TODO - delete after app complete
ui.mainButton.addEventListener('click', () => {
    console.log('Payment:');
    console.log(payment.content);
    console.log('PaymentSum:');
    console.log(payment.sum());
    console.log('Change:');
    console.log(change.content);
    console.log('ChangeSum:');
    console.log(change.sum());
    console.log('CashRegister:');
    console.log(register.content);
    console.log('CashRegisterSum:');
    console.log(register.sum());

    calculateChange();

});



checkCashRegister();

// НА ПОДУМАТЬ: 
// в существующей реализации некоторые элементы интерфейса являюся хранилищем и источником данных
// (отсюда много parseFloat и приведений к числу...)
// от этого необходимо избавиться, все данные должны храниться в переменных программы, а в интерфейс
// передаваться только для отображения.

// MVC
//Model - предоставляет данные и реагирует на команды контроллера, изменяя своё состояние
//View - отвечает за отображение данных пользователю, реагируя на изменения модели
//Controller - интерпретирует действия пользователя, оповещая модель о необходимости изменений