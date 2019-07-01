var catalog = [
    {
        id: 1,
        name: 'Item 1',
        price: 100,
        image: 'https://klike.net/uploads/posts/2018-10/1539499416_1.jpg'
    },
    {
        id: 2,
        name: 'Item 2',
        price: 200,
        image: 'https://klike.net/uploads/posts/2018-10/1539499405_3.jpg'
    },
    {
        id: 3,
        name: 'Item 3',
        price: 300,
        image: 'https://klike.net/uploads/posts/2018-10/1539499490_17.jpg'
    },
];

var cart = [];

/*var order = {
    totalPrice: 0,
    adress: null,
    comment: null,
}*/

function addToCart(event) {
    if(cart.length) {
        for(var i = 0; i < cart.length; i++) {
            if(cart[i].id == event.target.dataset.id) {
                cart[i].quantity++;
                return printCartMini(cart);
            }
        }
    }
    var temp = {
        id: event.target.dataset.id,
        name: event.target.dataset.name,
        quantity: 1,
        price: +event.target.dataset.price,
    };
    cart.push(temp);
    return printCartMini(cart);
}

//Функция для подсчета общей стоимости корзины
function countBasketPrice(){
    var totalPrice = 0;
    for(var i = 0; i < cart.length; i++){
        totalPrice += cart[i].quantity * cart[i].price;
    }
    return totalPrice;
}

function printCart(_cart, editFlag = true, cartId = 'cart') {
    var $cart = document.getElementById(cartId);
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
            if(editFlag) {
                var $itemPlus = document.createElement('div');
                $itemPlus.classList.add('item__section');
                $itemPlus.innerHTML = '<i class="fas fa-plus-square"></i>';
                $itemPlus.dataset.id = _cart[i].id;
                $itemPlus.addEventListener('click', cartItemPlus);
                $item.appendChild($itemPlus);

                var $itemDelete = document.createElement('div');
                $itemDelete.classList.add('item__section');
                $itemDelete.innerHTML = '<i class="fas fa-minus-square"></i>';
                $itemDelete.dataset.id = _cart[i].id;
                $itemDelete.addEventListener('click', cartItemMinus);
                $item.appendChild($itemDelete);
            }
    
            $cart.appendChild($item);
    
            totalCount += _cart[i].quantity;
            totalPrice += _cart[i].quantity * _cart[i].price;
        }
    
        $status.innerHTML = '<p> В корзине ' + totalCount + ' товаров на сумму ' + totalPrice + ' рублей.' + '</p>';
    }
    else{
        $status.innerHTML = 'Корзина пуста.'
    }

    if(editFlag) {
        var $button = document.createElement('button');
        $button.classList.add('next');
        $button.id = 'cartNext';
        $button.textContent = 'Далее';
        $cart.appendChild($button);
        $button.addEventListener('click', nextButton);
    }
    
}

function printCartMini(_cart) {
    var $cart = document.getElementById('cart-mini');
    var $status = document.createElement('div');

    $cart.innerHTML = '';

    $status.classList.add('status');
    $cart.appendChild($status);

    if(_cart.length){
        var totalPrice = null;
        var totalCount = null;
    
        for(var i = 0; i < _cart.length; i++){
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
        var $itemButton = $item.querySelector('.product__addToCart');

        for(var j = 0; j < keys.length; j++) {
            var key = keys[j];
            var $element = $item.querySelector('.product__' + key);
            switch(key) {
                case 'image':
                    $element.src = catalog[i][key];
                    break;
                case 'price':
                    $element.textContent = catalog[i][key] + ' р.';
                    $itemButton.dataset.price = catalog[i][key];
                    break;
                case 'name':
                    $element.textContent = catalog[i][key];
                    $itemButton.dataset.name = catalog[i][key];
                    break;
                case 'id':
                    $itemButton.dataset.id = catalog[i][key];
                    break;
            }
        }

        $catalog.appendChild($item);
    }
}

function cartItemPlus(event) {
    for(var i = 0; i < cart.length; i++) {
        if(cart[i].id == +event.currentTarget.dataset.id) {
            cart[i].quantity++;
        }
        printCart(cart);
    }
}

function cartItemMinus(event) {
    for(var i = 0; i < cart.length; i++) {
        if(cart[i].id == +event.currentTarget.dataset.id) {
            if(cart[i].quantity > 1) {
                cart[i].quantity--;
            }
            else {
                cart.splice(i, 1);
            }
        }
    }
    printCart(cart);
}

function accordion() {
    var panel = this.nextElementSibling;

    displayPanel(panel);
}

function displayPanel($panel) {
    if($panel.style.display == 'flex') {
        $panel.style.display = 'none';
    } 
    else {
        $panel.style.display = 'flex';
    }
}

function nextButton() {
    $button = this.id;

    switch ($button) {
        case 'cartNext':
            displayPanel(document.getElementById('cart'));
            displayPanel(document.getElementById('adressDiv'));
            break;
        case 'adressNext':
            displayPanel(document.getElementById('adressDiv'));
            displayPanel(document.getElementById('commentDiv'));
            break;
        case 'commentNext':
            //displayPanel(document.getElementById('commentDiv'));
            //displayPanel(document.getElementById('order'));
            printOrder();
            break;
    }

    //console.log($button);
}

function clickCart() {
    this.style.display = 'none';
    document.getElementById('cart-page').style.display = 'flex';
    document.getElementById('catalog').style.display = 'none';
    printCart(cart);
    var $next = document.getElementsByClassName('next');
    for(var i = 0; i < $next.length; i++) {
        $next[i].addEventListener('click', nextButton);
    }
}

function printOrder() {
    document.getElementById('cart-page').style.display = 'none';
    document.getElementById('order').style.display = 'block';
    printCart(cart, false, 'order__cart');

    document.getElementById('order__adress').textContent = document.getElementById('adress').value;
    document.getElementById('order__comment').textContent = document.getElementById('comment').value;
}

function init(){
    printCartMini(cart);
    buildCatalog(catalog);

    var $addToCart = document.getElementsByClassName('product__addToCart');
    for(var i = 0; i < $addToCart.length; i++) {
        $addToCart[i].addEventListener('click', addToCart);
    }

    var $accordion = document.getElementsByClassName('accordion');
    for(var i = 0; i < $accordion.length; i++) {
        $accordion[i].addEventListener('click', accordion);
    }

    document.getElementById('cart-mini').addEventListener('click', clickCart);
}

window.addEventListener('load', init);