//Задание 1. Написать функцию, преобразующую число в объект. 
//Передавая на вход число от 0 до 999, мы должны получить на выходе объект, в котором в соответствующих 
//свойствах описаны единицы, десятки и сотни. Например, для числа 245 мы должны получить следующий объект: 
//{‘единицы’: 5, ‘десятки’: 4, ‘сотни’: 2}. 
//Если число превышает 999, необходимо выдать соответствующее сообщение с помощью console.log и вернуть пустой объект.

function numberToObject(num){
    var outObject = 
        {
            one: null,
            tens: null,
            hundreds: null,
        };
    if(num < 1000 && num >= 0){
        outObject.one = num % 10;
        outObject.tens = ((num % 100) - outObject.one) / 10;
        outObject.hundreds = (num - outObject.tens * 10 - outObject.one) / 100;
        return outObject;
    }
    else{
        console.log("Неверное значение. Введите число от 0 до 999.");
        return outObject = null;
    }
}

var obj = numberToObject(+prompt('Введите число от 0 до 999'))

alert ('Единицы: ' + obj.one + '\nДесятки: ' + obj.tens + '\nСотни: ' + obj.hundreds);