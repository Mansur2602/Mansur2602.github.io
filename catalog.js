// const catalog = document.querySelector('.catalog')
// fetch('https://sneaker-database-stockx.p.rapidapi.com/stockx/sneakers?query=yeezy&market=yeezy', 
//     { 
//         headers: {
//             'x-rapidapi-key': 'd499744da0msh36294a2dd8c936ap1f0fd0jsnb6464ec9f597',
//             'x-rapidapi-host': 'sneaker-database-stockx.p.rapidapi.com'
//         }
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log(data); // Выводим весь ответ для проверки структуры

//         // Теперь получаем массив с кроссовками из results
//         const sneakers = data.data.results;

//         // Проверяем, что данные содержат массив с кроссовками
//         if (Array.isArray(sneakers)) {
//             sneakers.forEach(results => {
//                 const sneakerContainer = document.createElement('div')
//                 sneakerContainer.classList.add('sneakers')

//                 const imageUrl = results.media.smallImageUrl; 

//                 if (imageUrl) {
//                     console.log(imageUrl); 
//                     const img = document.createElement('img');
//                     img.classList.add('sneaker_img')
//                     const addToCart = document.createElement('button')
//                     addToCart.classList.add('add_to_cart')
//                     addToCart.textContent = 'ADD TO CART'
//                     const price = document.createElement('div')
//                     price.classList.add('price')
//                     const price_text = document.createElement('h3')
//                     price_text.classList.add('price_text')
//                     price_text.textContent = data.data.results.productTraits.value + '$'
//                     price.append(price_text)
//                     img.src = imageUrl;
//                     sneakerContainer.append(img, addToCart, price)
//                     catalog.append(sneakerContainer)
    
//                     document.body.appendChild(catalog); // Добавляем изображение на страницу
//                 }
//             });
//         } else {
//             console.error('Expected an array but received:', sneakers);
//         }
//     })
//     .catch(error => console.error('Error fetching data:', error));

// const catalog = document.querySelector('.catalog');

// fetch('https://sneaker-database-stockx.p.rapidapi.com/stockx/sneakers?query=yeezy&market=yeezy', 
//     { 
//         headers: {
//             'x-rapidapi-key': 'd499744da0msh36294a2dd8c936ap1f0fd0jsnb6464ec9f597',
//             'x-rapidapi-host': 'sneaker-database-stockx.p.rapidapi.com'
//         }
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log(data)
//         const sneakers = data.data.results;

//         sneakers.forEach(sneaker => {
//             const sneakerContainer = document.createElement('div');
//             sneakerContainer.classList.add('sneakers');

//             const img = document.createElement('img');
//             img.classList.add('sneaker_img');
//             img.src = sneaker.media.smallImageUrl;

//             const addToCart = document.createElement('button');
//             addToCart.classList.add('add_to_cart');
//             addToCart.textContent = 'ADD TO CART';

//             const price = document.createElement('div');
//             price.classList.add('price');
//             const priceText = document.createElement('h3');
//             priceText.classList.add('price_text');
//             priceText.textContent = sneaker.productTraits.value + '$'; // Предполагается, что это правильное поле для цены

//             price.append(priceText);
//             sneakerContainer.append(img, addToCart, price);
//             catalog.append(sneakerContainer);
//         });
//     });

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
        const sneakers = data.data.results;

        sneakers.forEach(sneaker => {
            const sneakerContainer = document.createElement('div');
            sneakerContainer.classList.add('sneakers');
            const action = document.createElement('div')
            action.classList.add('action')

            const img = document.createElement('img');
            img.classList.add('sneaker_img');
            img.src = sneaker.media.smallImageUrl;

            const addToCart = document.createElement('button');
            addToCart.classList.add('add_to_cart');
            addToCart.textContent = 'ADD TO CART';
            action.append(addToCart)

            const price = document.createElement('div');
            price.classList.add('price');
            const priceText = document.createElement('h3');
            priceText.classList.add('price_text');

            // Извлечение цены из productTraits
            const retailPriceTrait = sneaker.productTraits.find(trait => trait.name === "Retail Price");
            if (retailPriceTrait) {
                priceText.textContent = `${retailPriceTrait.value}$`;
                 
            }

            price.append(priceText);
            action.append(price)
            sneakerContainer.append(img, action);
            catalog.append(sneakerContainer);
        });
    });
