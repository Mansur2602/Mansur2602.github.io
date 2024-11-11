const catalog = document.querySelector('.catalog');

fetch('https://sneaker-database-stockx.p.rapidapi.com/stockx/sneakers?query=yeezy&market=yeezy', 
    { 
        headers: {
            'x-rapidapi-key': 'd499744da0msh36294a2dd8c936ap1f0fd0jsnb6464ec9f597',
            'x-rapidapi-host': 'sneaker-database-stockx.p.rapidapi.com'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        const sneakers = data.data.results;

        sneakers.forEach(sneaker => {
            const sneakerContainer = document.createElement('div');
            sneakerContainer.classList.add('sneakers');
            const action = document.createElement('div')
            action.classList.add('action')

            const img = document.createElement('img');
            img.classList.add('sneaker_img');
            img.src = sneaker.media.smallImageUrl;

            const name = document.createElement('h2')
            name.classList.add('sneaker_name')
            name.textContent = sneaker.name
            

            const addToCart = document.createElement('button');
            addToCart.classList.add('add_to_cart');
            addToCart.textContent = 'ADD TO CART';
            action.append(addToCart)

            const price = document.createElement('div');
            price.classList.add('price');
            const priceText = document.createElement('h3');
            priceText.classList.add('price_text');

            
            const retailPriceTrait = sneaker.productTraits.find(trait => trait.name === "Retail Price");
            if (retailPriceTrait) {
                priceText.textContent = `${retailPriceTrait.value}$`;
                 
            }

            price.append(priceText);
            action.append(price)
            sneakerContainer.append(name, img, action) ;
            catalog.append(sneakerContainer);
        });

   

function checkRegistration() {
    const isRegistered = localStorage.getItem('users')

    if (!isRegistered) {
        window.location.href = 'register.html';
    }
}


function addToCart(productName, productPrice, productImage) {
    const cartItem = {
        name: productName,
        price: parseFloat(productPrice),
        image: productImage,
        quantity: 1
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = cart.findIndex(item => item.name === productName);

    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += 1;
    } else {
        cart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart');
}


checkRegistration()

document.querySelectorAll('.add_to_cart').forEach(button => {
    button.addEventListener('click', function() {
        const sneaker = this.closest('.sneakers');
        const productName = sneaker.querySelector('.sneaker_name').innerText;
        const productPrice = sneaker.querySelector('.price_text').innerText.replace('$', '');
        const productImage = sneaker.querySelector('.sneaker_img').src;

        if (localStorage.getItem('users')) {
            addToCart(productName, productPrice, productImage);
        } else {
            alert("Please register before adding items to your cart.");
            window.location.href = 'register.html'
        }
    });
});





    });




