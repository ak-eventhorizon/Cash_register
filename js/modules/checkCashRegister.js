'use strict';

// need to refactor

function checkCashRegister(price, paymentInCash, changeInDrawer){

    let outputObj = {
        status: undefined,
        change: undefined
    };

    let currency = {
        penny: 0.01,
        nickel: 0.05,
        dime: 0.1,
        quarter: 0.25,
        dollar: 1,
        five: 5,
        ten: 10,
        twenty: 20,
        hundred: 100
    };

    return outputObj;
}

export {checkCashRegister};