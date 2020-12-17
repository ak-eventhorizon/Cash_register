// @ts-check -- enable type checking
'use strict';

function test(){
    console.log('Model test is OK');
    
}

export { test };

// Model - предоставляет данные и реагирует на команды контроллера, изменяя своё состояние
// model.js -- хранилище состояния и логики программы, без привезки к интерфейсу и событиям