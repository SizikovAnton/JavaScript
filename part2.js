var cart = [
    {
        name: 'item1',
        quantity: 1,
        price: 100,
    },
    {
        name: 'item2',
        quantity: 2,
        price: 200,
    },
];

//Функция для добавления нового элемента в корзину
function addToCart(_name, _quantity, _price){
    var temp = {
        name: _name,
        quantity: _quantity,
        price: _price,
    };
    return cart.push(temp);
}
//Функция для подсчета общей стоимости корзины
function countBasketPrice(){
    var totalPrice = 0;
    for(var i = 0; i < cart.length; i++){
        totalPrice += cart[i].quantity * cart[i].price;
    }
    return totalPrice;
}

alert('Результаты выполнения скрипта смотрите в консоле. \nДля добавления нового элемента в корзину используйте функцию addToCart \nДля подсчета общей стоимости корзины используйте функцию countBasketPrice')

addToCart('item3', 3, 300);
console.log(countBasketPrice());
