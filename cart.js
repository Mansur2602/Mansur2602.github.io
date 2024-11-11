
const cartData = localStorage.getItem('users');
const users = JSON.parse(cartData) || {};


const currentUserEmail = localStorage.getItem('currentUserEmail');
if (!currentUserEmail) {
    alert('Please log in to view your cart.');
    window.location.href = 'login.html'
}

let totalPrice = 0;

const currentUser = users[currentUserEmail];
const cart = currentUser ? currentUser.cart : [];

if (cart.length === 0) {
    document.body.innerHTML = '<h2>Your cart is empty</h2>';
}

cart.forEach(item => {
    const cartContainer = document.createElement('div');
    cartContainer.classList.add('cart_container');

    cartContainer.innerHTML = 
        `<img class="sneaker_img" src="${item.image}" alt="">
        <div class="text_box">
            <h2 class="sneaker_name">${item.name}</h2>
            <h2 class="sneaker_model">${item.model}</h2>
        </div>
        <div class="count_box">
            <h2 class="count_number">${item.quantity}</h2>
            <div class="arrows">
                <img class="arrow_img" id="up" src="./media/Rectangle 6.svg" alt="">
                <img class="arrow_img" id="down" src="./media/Rectangle 7.svg" alt="">
            </div>
        </div>
        <h2 class="price">$${item.totalPrice}</h2>
        <img class="trash" src="./media/Trash Can.svg" alt="">`;

    document.body.append(cartContainer);

    const upButton = cartContainer.querySelector('#up');
    const downButton = cartContainer.querySelector('#down');
    const countNumber = cartContainer.querySelector('.count_number');
    const priceElement = cartContainer.querySelector('.price');
    const trashButton = cartContainer.querySelector('.trash');

    totalPrice += parseFloat(item.totalPrice);

    upButton.addEventListener('click', () => {
        item.quantity += 1;
        item.totalPrice = (item.quantity * item.price).toFixed(2);

        countNumber.textContent = item.quantity;
        priceElement.textContent = `$${item.totalPrice}`;

        users[currentUserEmail].cart = cart;
        localStorage.setItem('users', JSON.stringify(users));

        updateTotalPrice();
    });

    downButton.addEventListener('click', () => {
        if (item.quantity > 1) { 
            item.quantity -= 1;
            item.totalPrice = (item.quantity * item.price).toFixed(2);

            countNumber.textContent = item.quantity;
            priceElement.textContent = `$${item.totalPrice}`;

            users[currentUserEmail].cart = cart;
            localStorage.setItem('users', JSON.stringify(users));

            updateTotalPrice();
        }
    });

    trashButton.addEventListener('click', () => {
        const itemIndex = cart.indexOf(item);
        if (itemIndex > -1) {
            cart.splice(itemIndex, 1)
            users[currentUserEmail].cart = cart; 
            localStorage.setItem('users', JSON.stringify(users));


            cartContainer.remove();
            updateTotalPrice();
        }
    });
});

function updateTotalPrice() {
    totalPrice = cart.reduce((sum, item) => sum + parseFloat(item.totalPrice), 0);
    
    let totalPriceElement = document.querySelector('.total-price');
    
    if (!totalPriceElement) {
        totalPriceElement = document.createElement('h2');
        totalPriceElement.classList.add('total-price');
        totalPriceElement.textContent = `TOTAL PRICE: $${totalPrice.toFixed(2)}`;
        document.body.append(totalPriceElement);
        
        addBuyButton();
    } else {
        totalPriceElement.textContent = `TOTAL PRICE: $${totalPrice.toFixed(2)}`;
    }
}

function addBuyButton() {
    const buyButton = document.createElement('button');
    buyButton.classList.add('buy-button');
    buyButton.textContent = 'BUY';
    
    buyButton.addEventListener('click', () => {
        alert('Thanks for your purchase!');
        
        delete users[currentUserEmail].cart;
        localStorage.setItem('users', JSON.stringify(users));

        document.querySelectorAll('.cart_container').forEach(container => container.remove());
        const totalPriceElement = document.querySelector('.total-price');
        if (totalPriceElement) {
            totalPriceElement.remove();
        }

        buyButton.remove();
    });
    
    document.body.append(buyButton);
}

updateTotalPrice();


