// const productDetails = JSON.parse(localStorage.getItem('cart'));



// const productDetails = JSON.parse(localStorage.getItem('cart'))

// console.log(productDetails)
// console.log(productDetails.name)
// const cart_container = document.createElement('div')
// cart_container.classList.add('cart_container')
// const sneaker_img = document.createElement('img')
// sneaker_img.classList.add('sneaker_img')
// sneaker_img.src = productDetails.image
// cart_container.append(sneaker_img)
// document.body.append(cart_container)

// Получаем данные из localStorage
const cartData = localStorage.getItem('cart');
const cart = JSON.parse(cartData);
    
    
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
            <h2 class="price">$${item.price}</h2>
            <img class="trash" src="./media/Trash Can.svg" alt="">`
        ;

        document.body.append(cartContainer)
    });

