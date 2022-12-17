if (document.readyState == 'loading') {                     //Making sure html page is loaded
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}

// Setting up all the event listeners for all the items that are ALREADY loaded into our document at the beginning of our document load.

function ready() {
    var removeCartItemButtons = document.getElementsByClassName("btn-danger");
//console.log(removeCartItemButtons);

for(var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i];

    /* 
        'addEventListener' returns 'event' object inside 'removeCartItem()' function 
        'event' object has a property called 'target' and 'target' is nothing but whatever button we clicked on. 
    */
        button.addEventListener('click', removeCartItem)      
        
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input');
    for(var i = 0; i < quantityInputs.length; i++) {
       var input = quantityInputs[i];
       input.addEventListener('change', quantityChanged)
        
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button');
    for(var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i];
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked);

}

function purchaseClicked() {
    alert("Thank you for shopping with us.");
    var cartItems = document.getElementsByClassName('cart-items')[0];
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }
    
    updateCartTotal();
}


function removeCartItem(event) {
    var buttonClicked = event.target;

    /* 
        Now remember what we want to remove ? Our whole *CART* row right ?
        So, to do that we cant just remove the button object, we have to delete the whole row ('cart-row'), but the whole row is 
        parent of parent of the button clicked. So, below how is we access that.
    */    
        buttonClicked.parentElement.parentElement.remove(); // Removing 'cart-row' 
        updateCartTotal();
}


function addToCartClicked(event) {
    var button = event.target;
    var shopItem = button.parentElement.parentElement;
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerHTML;
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerHTML;
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
    console.log(title,price,imageSrc);
    addItemToCart(title, price, imageSrc);

    updateCartTotal();
    

}


function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title');
    for(var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart');
            return;
        }
    }

     // backticks so that we can use our string on multiple different lines.

    var cartRowContents = `                
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
    
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" role="button">REMOVE</button>
        </div>`

        cartRow.innerHTML = cartRowContents;
    cartItems.appendChild(cartRow);

    /*
        The following code is very very important to under concept wise.
        In the following code, we HAD to add 'addEventListener' even though we already had event listener for button and change
        of input quantity, why ?????

        The answer is: we added the event listener for 'as soon as the document loaded' and the 'REMOVE' button was not there 
        when the document loaded, it was added 'AFTER' we loaded the document, so we need to add a event listener to this REMOVE 
        button. ALso an event listener 
    */

    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);

}


function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {       //Making sure the input value is not empty and input value is not <= 0
        input.value = 1;
    }

    updateCartTotal();  //whenver quantity is changed update cart total

}



var removeCartItemButtons = document.getElementsByClassName("btn-danger");
//console.log(removeCartItemButtons);

for(var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];

    /* 
        'addEventListener' returns 'event' object inside the function, 
        'event' object has a property called 'target' and 'target' is nothing but whatever button we clicked on. 
    */
        button.addEventListener('click', function(event) {      
        var buttonClicked = event.target;

    /* 
        Now remember what we want to remove ? Our whole *CART* row right ?
        So, to do that we cant just remove the button object, we have to delete the whole row ('cart-row'), but the whole row is 
        parent of parent of the button clicked. So, below how is we access that
    */    
        buttonClicked.parentElement.parentElement.remove(); // Removing 'cart-row' 
        updateCartTotal();
    })
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]        //'[0]' because we only want 1st element of type 'cart-items'.
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;
    for(var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        var price = parseFloat(priceElement.innerHTML.replace('$', ''));
        var quantity = quantityElement.value;
        //console.log(price * quantity);
        total = total + (price * quantity);
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart-total-price')[0].innerHTML = '$' + total;

}