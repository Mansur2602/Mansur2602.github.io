const catalog = document.querySelector('.catalog');
const searchInput = document.querySelector('.search');
const filterSelect = document.querySelector('.select');

let sneakers = [];


function displaySneakers(sneakersList) {
    catalog.innerHTML = ''

    sneakersList.forEach(sneaker => {
        const sneakerContainer = document.createElement('div');
        sneakerContainer.classList.add('sneakers');
        const action = document.createElement('div');
        action.classList.add('action');

        const img = document.createElement('img');
        img.classList.add('sneaker_img');
        img.src = sneaker.media.smallImageUrl;

        const name = document.createElement('h2');
        name.classList.add('sneaker_name');
        name.textContent = sneaker.name;

        const model = document.createElement('h2');
        model.classList.add('sneaker_model');
        model.textContent = sneaker.model;

        const addToCart = document.createElement('button');
        addToCart.classList.add('add_to_cart');
        addToCart.textContent = 'ADD TO CART';
        action.append(addToCart);

        const price = document.createElement('div');
        price.classList.add('price');
        const priceText = document.createElement('h3');
        priceText.classList.add('price_text');
        const retailPriceTrait = sneaker.productTraits.find(trait => trait.name === "Retail Price");
        let retailPrice = retailPriceTrait ? parseFloat(retailPriceTrait.value) : 0;
        priceText.textContent = `${retailPrice}$`;
        price.append(priceText);
        action.append(price);

        sneakerContainer.append(name, model, img, action);
        catalog.append(sneakerContainer);

        addToCart.addEventListener('click', function() {
            const productName = name.innerText;
            const productPrice = retailPrice;
            const productImage = img.src;
            const productModel = model.innerText;

            const currentUserEmail = localStorage.getItem('currentUserEmail');

            if (currentUserEmail) {
                addToCartFunction(currentUserEmail, productName, productPrice, productImage, productModel);
            } else {
                alert("Please register or log in before adding items to your cart.");
                window.location.href = 'register.html';
            }
        });
    });
}


function searchSneakers(query) {
    const filteredSneakers = sneakers.filter(sneaker => {
        return sneaker.name.toLowerCase().includes(query.toLowerCase());
    });
    displaySneakers(filteredSneakers);
}


function sortSneakers(option) {
    let sortedSneakers;
    if (option === "from_expensive") {
        sortedSneakers = [...sneakers].sort((a, b) => {
            const priceA = parseFloat(a.productTraits.find(trait => trait.name === "Retail Price")?.value) || 0;
            const priceB = parseFloat(b.productTraits.find(trait => trait.name === "Retail Price")?.value) || 0;
            return priceB - priceA
        });
    } else if (option === "from_cheap") {
        sortedSneakers = [...sneakers].sort((a, b) => {
            const priceA = parseFloat(a.productTraits.find(trait => trait.name === "Retail Price")?.value) || 0;
            const priceB = parseFloat(b.productTraits.find(trait => trait.name === "Retail Price")?.value) || 0;
            return priceA - priceB
        });
    } else {
        sortedSneakers = [...sneakers]
    }

    displaySneakers(sortedSneakers)
}


fetch('https://sneaker-database-stockx.p.rapidapi.com/stockx/sneakers?query=yeezy&market=yeezy', 
    { 
        headers: {
            'x-rapidapi-key': 'd499744da0msh36294a2dd8c936ap1f0fd0jsnb6464ec9f597',
            'x-rapidapi-host': 'sneaker-database-stockx.p.rapidapi.com'
        }
    })
    .then(response => response.json())
    .then(data => {
        sneakers = data.data.results


        displaySneakers(sneakers);


        searchInput.addEventListener('input', (e) => {
            searchSneakers(e.target.value);
        });


        filterSelect.addEventListener('change', (e) => {
            sortSneakers(e.target.value);
        });
    })
    .catch(error => console.error('Error fetching sneakers:', error));


function addToCartFunction(userEmail, productName, productPrice, productImage, productModel) {
    let users = JSON.parse(localStorage.getItem('users')) || {};

    if (users[userEmail]) {
        let userCart = users[userEmail].cart || [];

        const existingItemIndex = userCart.findIndex(item => item.name === productName);

        if (existingItemIndex > -1) {
            userCart[existingItemIndex].quantity += 1;
            userCart[existingItemIndex].totalPrice = (userCart[existingItemIndex].quantity * productPrice).toFixed(2);
        } else {
            const newItem = {
                name: productName,
                price: productPrice,
                image: productImage,
                model: productModel,
                quantity: 1,
                totalPrice: productPrice.toFixed(2)
            };
            userCart.push(newItem);
        }

        users[userEmail].cart = userCart;
        localStorage.setItem('users', JSON.stringify(users));

        alert('Product added to cart');
    }
}

function checkRegistration() {
    const currentUserEmail = localStorage.getItem('currentUserEmail');

    if (!currentUserEmail) {
        window.location.href = 'register.html';
    }
}

checkRegistration();

