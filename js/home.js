const popularDrinksContainer = document.getElementById('popular-drinks');

function createPopularDrinkCard(drink) {
    const card = document.createElement('article');
    card.className = 'drink-card';
    card.innerHTML = `
        <img src="${drink.image}" alt="${drink.alt}">
        <div class="drink-text">
            <h3>${drink.name}</h3>
            <p>${drink.description} <span class="price">${drink.price}tg</span></p>
            <a href="menu.html" class="btn btn-coffee rounded-pill">Order</a>
        </div>
    `;
    return card;
}

function showPopularDrinks() {
    for (const drink of popularDrinks) {
        popularDrinksContainer.appendChild(createPopularDrinkCard(drink));
    }
}

document.addEventListener('DOMContentLoaded', function () {
    showPopularDrinks();
    fadeInPopularCards();
});
