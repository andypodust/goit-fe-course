
let userInput;

const numbers = [];

let total = 0;

let cancel = null;

while (userInput !== cancel) {
    userInput = prompt ('Введите любое число');
    
    numbers.push (parseFloat(userInput));
}

numbers === numbers.pop();

for (i=0; i < numbers.length; i++) {

    total = total + numbers[i];
}

alert ('Сумма элементов массива: ' +total);
    


