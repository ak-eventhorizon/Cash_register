// @ts-check -- enable type checking
'use strict';

function test(){
    console.log('Controller test is OK');
    
}

export { test };


// Controller - интерпретирует действия пользователя, оповещая модель о необходимости изменений
// controller.js -- все возможные действия пользователя описываются тут
// model <---> controller <---> view