# freeCodeCamp - Algorithms and Data Structures Projects

## 5 - Cash Register

Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price), payment as the second argument (cash), and cash-in-drawer (CID) as the third argument.

CID is a 2D array listing available currency.

|    Currency Unit    |       Amount       |
|:-------------------:|:------------------:|
|        Penny        |    $0.01 (PENNY)   |
|        Nickel       |   $0.05 (NICKEL)   |
|         Dime        |     $0.1 (DIME)    |
|       Quarter       |   $0.25 (QUARTER)  |
|        Dollar       |      $1 (ONE)      |
|     Five Dollars    |      $5 (FIVE)     |
|     Ten Dollars     |      $10 (TEN)     |
|    Twenty Dollars   |    $20 (TWENTY)    |
| One-hundred Dollars | $100 (ONE HUNDRED) |

### Test Case:

The checkCashRegister() function should always return an object with a status key and a change key.

Return 
```JavaScript
{
    status: "INSUFFICIENT_FUNDS",  
    change: []
}
```  
if cash-in-drawer is less than the change due, or if you cannot return the exact change.

Return  
```JavaScript
{
    status: "CLOSED", 
    change: [...]
}
```  
with cash-in-drawer as the value for the key change if it is equal to the change due.

Otherwise, return  
```JavaScript
{
    status: "OPEN",  
    change: [...]
}
```  
with the change due in coins and bills, sorted in highest to lowest order, as the value of the change key.
