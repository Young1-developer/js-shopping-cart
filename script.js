document.addEventListener('DOMContentLoaded', () => {
    const cartElementsContainer = document.getElementById('cart-wrapper');
    const cartPrice = document.getElementById('cart-price');

    let cartTotalPrice = 0;

    async function fetchData(){
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        DisplayData(data);
    }


    function DisplayData(data){
        cartElementsContainer.innerHTML = '';
        data.forEach(element => {
            const cartElement = document.createElement('div');
            cartElement.classList.add('item');

            cartElement.innerHTML = `
            <div class="inner-item">
            <p><strong>Title: ${element.title}</strong></p>
            <p>Price: $${element.price}</p>
             <button class="btn" onclick="addToCart(${element.id}, '${element.title}' ,${element.price})">Add to Cart</button>
            </div>
            `

            cartElementsContainer.appendChild(cartElement)
        });
    }


window.addToCart = function (id,title,price){
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({id,title,price})
    localStorage.setItem('cart', JSON.stringify(cart))
    updatedPrice(price)
}


function updatedPrice(price){
    cartTotalPrice += price;
    cartPrice.innerText = `Total: $${cartTotalPrice.toFixed(2)}`
}



    fetchData()
})