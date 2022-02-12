'use strict';

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
    
        function calculateMapElement(value, key){
            let multiple = key * value;
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
    
        function calculateMapElement(value, key){
            let multiple = key * value;
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
    
        function calculateMapElement(value, key){
            let multiple = key * value;
            result += multiple;
        }
        this.content.forEach(calculateMapElement);
        return result.toFixed(2);
    }
};





const ui = {
    // all input fields
    payment: document.querySelector('#payment_field'),
    price: document.querySelector('#price_field'),
    change: document.querySelector('#change_field'),
    status: document.querySelector('#status_field'),

    // clickable elements
    clientButtons: document.querySelectorAll('div.client_pocket > div.cash > div.cell'),
    mainButton: document.querySelector('#action_button'),

    // quantity xNN elements
    changeQuantityCells: document.querySelectorAll('div.change div.quantity'),
    registerQuantityCells: document.querySelectorAll('div.cash_register div.quantity'),

    resetPayment: function (){
        this.payment.value = '0.00';
    },
    resetPrice: function (){
        this.price.value = '0.00';
    },
    setChange: function (num){
        this.change.value = num;
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





// MAIN CALCULATING function
function calculateChange() {
    let priceValue = +parseFloat(ui.price.value).toFixed(2);
    let paymentValue = +parseFloat(ui.payment.value).toFixed(2);
    let changeNeeded = +(paymentValue - priceValue).toFixed(2);

    if (changeNeeded === 0) {
        ui.status.value = "CHANGE DONT NEEDED (0$)";
    } else if (changeNeeded < 0){
        ui.status.value = "NOT ENOUGH PAYMENT";
    } else {
        changePickForSum(changeNeeded);        
    }
}

// тут происходит набор сдачи (number) из купюр, находящихся в register (если это возможно)
function changePickForSum(number) {

    // перед началом действий с содержимым кассы и сдачи - делаются копии их исходного
    // состояния, чтобы можно было их вернуть в случае невозможности завершения операции
    const backupRegisterMap = new Map (register.content);
    const backupChangeMap = new Map (change.content);

    let remainingChange = number;
    let changePickingIsPossible = true;

    // ВНЕШНИЙ ЦИКЛ (по номиналам купюр)
    for (let [rate,quantity] of register.content.entries()) {
        // rate - номинал купюры (эквивалент key)
        // quantity - количество купюр в кассе (эквивалент value)

        // ВНУТРЕННИЙ ЦИКЛ (по каждой купюре из номинала rate)
        for (let i = quantity; i >= 0; i--) {
            
            if (remainingChange === 0) {
                // если сдача не требуется

                break; // прерывает ВНУТРЕННИЙ цикл

            } else if ( (remainingChange > rate) && (i !== 0)) {
                // если необходимая сдача больше текущей купюры в кассе и такие купюры есть
                
                moveOneCashUnit(register.content, change.content, rate);
                remainingChange = remainingChange - rate;

            } else if ((remainingChange !== 0) && (rate === 0.01) && (i === 0)){
                // если сдача еще нужна, а цикл дошел до самой маленькой купюры и их количество 0
                
                changePickingIsPossible = false;
                break;

            } else {

                break;

            }

            //НУЖНО ТЕСТИРОВАНИЕ АЛГОРИТМА (последовательность условий не верная??) !!
            console.log(`Осталось ${i} купюр номиналом ${rate}`); // удалить после отладки
        }

        if (remainingChange === 0) {
            ui.status.value = "CHANGE CALCULATED";
            ui.setChange(change.sum());
            break; // прерывает внешний цикл
        } else if (!changePickingIsPossible) {
            ui.status.value = "NO FUNDS FOR PICK CHANGE";
            
            //восстановление содержимого из резервных копий
            register.content = new Map(backupRegisterMap);
            change.content = new Map (backupChangeMap);

            //обновление состояния интерфейса к исходному
            ui.refreshRegisterCells();
            ui.refreshChangeCells();

            break; // прерывает ВНЕШНИЙ цикл
        }

        console.log(rate, quantity); // удалить после отладки
    } 
}

// перенос одной купюры cashUnit из одной структуры fromMap в другую toMap
function moveOneCashUnit(fromMap, toMap, cashUnit){
    let fromValue = fromMap.get(cashUnit);
    let toValue = toMap.get(cashUnit);

    if (fromValue > 0) {
        fromMap.set(cashUnit, --fromValue);
        toMap.set(cashUnit, ++toValue);
    } else {
        console.log(`function moveOneCashUnit get 'fromMap' value <= 0`);
    }

    ui.refreshRegisterCells();
    ui.refreshChangeCells();
}





// add event listeners on interface buttons

function clientPocketButtonAction (event){
    //номинал купюры с которой имеем дело
    let cashUnit = +event.target.innerHTML;

    // подсчет и вывод поля Payment
    let result = +payment.sum() + cashUnit;
    ui.payment.value = result.toFixed(2);

    // инкремент определенного Map'a из payment.content (плюс одна купюра)
    let currentQuantity = payment.content.get(cashUnit);
    payment.content.set(cashUnit, ++currentQuantity);
}

for (let element of ui.clientButtons) {
    element.addEventListener('click', clientPocketButtonAction);
}

ui.mainButton.addEventListener('click', calculateChange);

// TODO -- MVC structure
// разнести функционал по модулям, переделать на парадигму @ts-check и @param

// RPK-16 UP