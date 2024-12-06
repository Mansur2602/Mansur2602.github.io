const catalog = document.querySelector('.catalog')
const searchInput = document.querySelector('.search')
const filterSelect = document.querySelector('.select')

let sneakers = []

function displaySneakers(sneakersList) {
    catalog.innerHTML = ''

    sneakersList.forEach(sneaker => {
        const sneakerContainer = document.createElement('div')
        sneakerContainer.classList.add('sneakers')
        const action = document.createElement('div')
        action.classList.add('action')

        const img = document.createElement('img')
        img.classList.add('sneaker_img')
        img.src = sneaker.poster.url

        const name = document.createElement('h2')
        name.classList.add('sneaker_name')
        name.textContent = sneaker.alternativeName

        const model = document.createElement('h2')
        model.classList.add('sneaker_model')
        model.textContent = sneaker.id

        const addToCart = document.createElement('button')
        addToCart.classList.add('add_to_cart')
        addToCart.textContent = 'ADD TO CART'
        action.append(addToCart)

        const price = document.createElement('div')
        price.classList.add('price')
        const priceText = document.createElement('h3')
        priceText.classList.add('price_text')
        priceText.textContent = `${sneaker.movieLength}$`
        price.append(priceText)
        action.append(price)

        sneakerContainer.append(name, model, img, action)
        catalog.append(sneakerContainer)

        addToCart.addEventListener('click', function() {
            const productName = name.innerText
            const productPrice = sneaker.id
            const productImage = img.src
            const productModel = model.innerText

            const currentUserEmail = localStorage.getItem('currentUserEmail')

            if (currentUserEmail) {
                addToCartFunction(currentUserEmail, productName, productPrice, productImage, productModel)
            } else {
                alert("Please register or log in before adding items to your cart.")
                window.location.href = 'register.html'
            }
        });
    });
}

function searchSneakers(query) {
    const filteredSneakers = sneakers.filter(sneaker => {
        return sneaker.alternativeName.toLowerCase().includes(query.toLowerCase());
    });
    displaySneakers(filteredSneakers);
}

function sortSneakers(option) {
    let sortedSneakers;

    if (option === "from_expensive") {
        sortedSneakers = [...sneakers].sort((a, b) => {
            const priceA = parseFloat(a.movieLength) || 0
            const priceB = parseFloat(b.movieLength) || 0
            return priceB - priceA
        });
    }
   
    else if (option === "from_cheap") {
        sortedSneakers = [...sneakers].sort((a, b) => {
            const priceA = parseFloat(a.movieLength) || 0
            const priceB = parseFloat(b.movieLength) || 0
            return priceA - priceB
        });
    } else {
        sortedSneakers = sneakers
    }

    displaySneakers(sortedSneakers);
}


fetch('https://api.kinopoisk.dev/v1.4/movie/search?page=1&limit=10&query=%D0%93%D0%B0%D1%80%D1%80%D0%B8%20%D0%BF%D0%BE%D1%82%D1%82%D0%B5%D1%80', 
    { 
        headers: {
            'accept': 'application/json',
            'X-API-KEY': 'FT44EKK-8H4MPNY-H0RHS15-Z5H22JZ'
        }
    })
    .then(response => response.json())
    .then(data => {
        sneakers = data.docs
        displaySneakers(sneakers)

        searchInput.addEventListener('input', (e) => {
            searchSneakers(e.target.value)
        });

        filterSelect.addEventListener('change', (e) => {
            sortSneakers(e.target.value)
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

        $('#notification')
        .addClass('show')  
        .fadeIn(500);

   
    setTimeout(function() {
        $('#notification').fadeOut(1000, function() {
            $(this).removeClass('show')
        });
    }, 3000); 
    }
}

