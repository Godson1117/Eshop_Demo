document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.tab');
    const buttons = document.querySelectorAll('.add-to-cart');
    const contents = document.querySelectorAll('.content');

    function renderCards(categoryProducts, contentElement) {
        let cardContainer = document.createElement('div')
        cardContainer.classList.add('card-container')
        contentElement.innerHTML = ''
        categoryProducts.forEach(product => {
            const offPercent=(((product.compare_at_price-product.price)/product.price)*100).toFixed(0)
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                ${product.badge_text ? `<div class="label">${product.badge_text}</div>` : ''}
                <div class="details">
                    <h2>${product.title}</h2>
                    <p class="brand circle-container">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${product.vendor}</p>
                    <p class="price">Rs ${product.price} <span class="old-price">${product.compare_at_price}</span> <span class="discount">${offPercent}% Off</span></p>
                    <button class="add-to-cart">Add to Cart</button>
                </div>
            `;
            cardContainer.appendChild(card);
            contentElement.appendChild(cardContainer);
        });
    }

    function fetchDataAndRender(category) {
        fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json') 
            .then(response => response.json())
            .then(data => {
                const categoryData = data.categories.find(cat => cat.category_name === category);
                const contentElement = document.getElementById(category);
                renderCards(categoryData.category_products, contentElement);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const target = this.getAttribute('data-target');

            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            contents.forEach(c => c.classList.remove('active'));
            const targetContent = document.getElementById(target);
            targetContent.classList.add('active');

            fetchDataAndRender(target);
        });
    });

    
    fetchDataAndRender('Men');

    document.addEventListener('click', function (e) {
        if (e.target && e.target.classList.contains('add-to-cart')) {
            alert('Item added to cart!');
        }
    });
});
