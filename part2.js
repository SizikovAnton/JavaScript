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
    }
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

function printCart(_cart){
    var $cart = document.getElementById('cart');
    var $status = document.createElement('div');

    $status.classList.add('status');
    $cart.appendChild($status);

    if(_cart[0]){
        var totalPrice = null;
        var totalCount = null;
    
        for(var i = 0; i < _cart.length; i++){
            var $item = document.createElement('div');
            $item.classList.add('item');
            
            var $itemName = document.createElement('div');
            $itemName.classList.add('item__section');
            $itemName.textContent = (i + 1) + '. ' + _cart[i].name;
            $item.appendChild($itemName);
    
            var $itemQuantity = document.createElement('div');
            $itemQuantity.classList.add('item__section');
            $itemQuantity.textContent = _cart[i].quantity + ' шт. х ' + _cart[i].price + 'р.';
            $item.appendChild($itemQuantity);
    
            var $itemPrice = document.createElement('div');
            $itemPrice.classList.add('item__section');
            $itemPrice.textContent = 'Итого: ' + (_cart[i].quantity * _cart[i].price) + 'р.';
            $item.appendChild($itemPrice);
    
            $cart.appendChild($item);
    
            totalCount += _cart[i].quantity;
            totalPrice += _cart[i].quantity * _cart[i].price;
        }
    
        $status.innerHTML = '<p> В корзине ' + totalCount + ' товаров на сумму ' + totalPrice + ' рублей.' + '</p>';
    
    }
    else{
        $status.innerHTML = 'Корзина пуста.'
    }
}

addToCart('item3', 3, 300);
addToCart('item4', 4, 400);
addToCart('item5', 5, 500);

printCart(cart);

//console.log(countBasketPrice());