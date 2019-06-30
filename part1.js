var catalog = [
    {
        name: 'Item 1',
        price: 100,
        image: 'https://klike.net/uploads/posts/2018-10/1539499416_1.jpg'
    },
    {
        name: 'Item 2',
        price: 200,
        image: 'https://klike.net/uploads/posts/2018-10/1539499405_3.jpg'
    },
    {
        name: 'Item 3',
        price: 300,
        image: 'https://klike.net/uploads/posts/2018-10/1539499490_17.jpg'
    },
];

var cart = [];


function addToCart(event) {
    if(cart.length) {
        for(var i = 0; i < cart.length; i++) {
            if(cart[i].name == event.target.parentElement.dataset.name) {
                cart[i].quantity++;
                return printCart(cart);
            }
        }
    }
    var temp = {
        name: event.target.parentElement.dataset.name,
        quantity: 1,
        price: +event.target.parentElement.dataset.price,
    };
    cart.push(temp);
    return printCart(cart);
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

    $cart.innerHTML = '';

    $status.classList.add('status');
    $cart.appendChild($status);

    if(_cart.length){
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

function buildCatalog(catalog) {
    var $template = document.getElementById('productTemplate').children[0];
    var $catalog = document.getElementById('catalog');
    
    for(var i = 0; i < catalog.length; i++) {
        var $item = $template.cloneNode(true);
        var keys = Object.keys(catalog[i]);
        
        for(var j = 0; j < keys.length; j++) {
            var key = keys[j];
            var $element = $item.querySelector('.product__' + key);
            if(key == 'image') {
                $element.src = catalog[i][key];
            }  
            else if(key == 'price') {
                $element.textContent = catalog[i][key] + ' р.';
                $item.dataset.price = catalog[i][key];
            }
            else {
                $element.textContent = catalog[i][key];
                $item.dataset.name = catalog[i][key];
            }
        }

        $catalog.appendChild($item);
    }
}

function init(){
    printCart(cart);
    buildCatalog(catalog);

    var $addToCart = document.getElementsByClassName('product__addToCart');
    for(var i = 0; i < $addToCart.length; i++) {
        $addToCart[i].addEventListener('click', addToCart);
    }
}

window.addEventListener('load', init);