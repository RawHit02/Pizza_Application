import pizzaOperations from "./pizza-operations.js";

async function printPizzas() {
    const allPizzas = await pizzaOperations.getPizzas();
    const div = document.getElementById('pizza-output');
    console.log('All Pizza ', allPizzas);
    for (var pizza of allPizzas) {
        const card = createCard(pizza);
        div.appendChild(card);
    }

    const payButton = document.getElementById('rzp-button1');
    payButton.addEventListener('click', function () {
        rzp1.open();
    });
}


const printTotal = (pizzas) =>
    pizzas.reduce((sum, pizza) => sum + parseInt(pizza.price), 0);

function printBasket(total) {
    const basketDiv = document.getElementById('basket');
    basketDiv.innerHTML = '';
    const pizzasInCart = pizzaOperations.pizzas.filter(pizza => pizza.isAddedInCart);

    while (basketDiv.firstChild) {
        basketDiv.removeChild(basketDiv.firstChild);
    }

    // Check if basket heading is already added
    const basketHeading = basketDiv.querySelector('.basket-heading');
    if (!basketHeading) {
        // Add the basket heading and icon
        const newBasketHeading = document.createElement('div');
        newBasketHeading.className = 'basket-heading';
        newBasketHeading.innerHTML = `<h2 class="mr-2">Shopping Bill --> <img src=" ./basket.png" alt="Basket" width="40" height="40"></h2>`;
        basketDiv.prepend(newBasketHeading); // Add the heading at the beginning
        

    }
    

    pizzasInCart.forEach(pizza => {
        const pTag = printItem(pizza);
        basketDiv.appendChild(pTag);
    });

    const totalPTag = document.createElement("p");
    const GST = 19/100;
    const grandTotal = (total*GST)+total;
    totalPTag.innerText = `AMOUNT (19%GST) = ₹${grandTotal} `;
    totalPTag.style="color:green";
    basketDiv.appendChild(totalPTag);

    const payButtonContainer = document.getElementById('payment-button-container');
    const payButton = document.getElementById('rzp-button1');
    
    payButton.className = 'btn btn-primary';
    payButton.innerText = `Pay Now : ₹${grandTotal}`;
    
    payButtonContainer.appendChild(payButton);
    
}


function printItem(pizza) {
    const pTag = document.createElement('p');
    pTag.innerText = `Pizza Name : ${pizza.name} Price : ${pizza.price}`;
    return pTag;
    
}

function addToCart() {
    const currentButton = this;
    const pizzaid = currentButton.getAttribute('pizza-id');
    pizzaOperations.searchPizza(pizzaid);
    console.log('Pizza id ', pizzaid);

    const pizzasInCart = pizzaOperations.pizzas.filter(pizza => pizza.isAddedInCart);
    const total = printTotal(pizzasInCart);

    printBasket(total);
}

function createCard(pizza) {
    const colDiv = document.createElement('div');
    colDiv.className = 'col-4';
    const cardDiv = document.createElement("div");
    cardDiv.className = 'card';
    cardDiv.style = { width: '18rem' };
    const img = document.createElement('img');
    img.src = pizza.url;
    img.className = 'card-img-top';
    cardDiv.appendChild(img);
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    const h5 = document.createElement('h5');
    h5.className = 'card-title';
    h5.innerText = pizza.name;
    cardBody.appendChild(h5);
    cardDiv.appendChild(cardBody);
    const pTag = document.createElement('p');
    pTag.className = 'card-text';
    pTag.innerText = pizza.desc;
    cardBody.appendChild(pTag);
    const button = document.createElement('button');
    button.className = 'btn btn-primary';
    button.setAttribute('pizza-id', pizza.id);
    button.innerText = 'Add to Cart';
    button.addEventListener('click', addToCart);
    cardBody.appendChild(button);
    colDiv.appendChild(cardDiv);
    return colDiv;
}

printPizzas();
