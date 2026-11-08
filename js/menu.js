const searchInput = document.getElementById('search-input');
const typeFilter = document.getElementById('type-filter');
const menuBody = document.getElementById('menu-body');
const noResultsMessage = document.getElementById('no-results');
const cartList = document.getElementById('cart-list');
const cartEmptyMessage = document.getElementById('cart-empty');
const cartTotal = document.getElementById('cart-total');
const orderButton = document.getElementById('order-button');
const favoritesList = document.getElementById('favorites-list');
const favoritesEmptyMessage = document.getElementById('favorites-empty');

let cartIds = loadFromStorage('cartIds', []);
let favoriteIds = loadFromStorage('favoriteIds', []);

function findDrinkById(id) {
    return drinks.find(function (drink) {
        return drink.id === id;
    });
}

function filterDrinks(searchText, type) {
    const text = searchText.trim().toLowerCase();
    return drinks.filter(function (drink) {
        const matchesText = drink.name.toLowerCase().includes(text);
        const matchesType = type === 'all' || drink.type === type;
        return matchesText && matchesType;
    });
}

function calculateTotal(ids) {
    let total = 0;
    for (const id of ids) {
        total += findDrinkById(id).price;
    }
    return total;
}

function createDrinkRow(drink) {
    const row = document.createElement('tr');
    const bestSellerLabel = drink.bestSeller ? ' (Best seller)' : '';
    const favoriteClass = favoriteIds.includes(drink.id) ? 'active' : '';

    if (drink.bestSeller) {
        row.classList.add('highlight-row');
    }

    row.innerHTML = `
        <td>${drink.name}${bestSellerLabel}</td>
        <td>${drink.type}</td>
        <td>${drink.size}</td>
        <td>${drink.price}tg</td>
        <td>
            <button type="button" class="action-button favorite-button ${favoriteClass}" data-action="favorite" data-id="${drink.id}" aria-label="Add ${drink.name} to favorites">&#9829;</button>
            <button type="button" class="action-button" data-action="add" data-id="${drink.id}" aria-label="Add ${drink.name} to cart">Add</button>
        </td>
    `;
    return row;
}

function showDrinks(drinksToShow) {
    menuBody.innerHTML = '';
    for (const drink of drinksToShow) {
        menuBody.appendChild(createDrinkRow(drink));
    }
    noResultsMessage.classList.toggle('d-none', drinksToShow.length > 0);
}

function updateMenu() {
    showDrinks(filterDrinks(searchInput.value, typeFilter.value));
}

function createCartItem(drink, index) {
    const item = document.createElement('li');
    item.className = 'cart-item';
    item.innerHTML = `
        <span>${drink.name} - ${drink.price}tg</span>
        <button type="button" class="action-button" data-index="${index}">Remove</button>
    `;
    return item;
}

function showCart() {
    cartList.innerHTML = '';
    cartIds.forEach(function (id, index) {
        cartList.appendChild(createCartItem(findDrinkById(id), index));
    });
    cartTotal.textContent = calculateTotal(cartIds) + 'tg';
    cartEmptyMessage.classList.toggle('d-none', cartIds.length > 0);
    orderButton.disabled = cartIds.length === 0;
}

function showFavorites() {
    favoritesList.innerHTML = '';
    for (const id of favoriteIds) {
        const item = document.createElement('li');
        item.textContent = findDrinkById(id).name;
        favoritesList.appendChild(item);
    }
    favoritesEmptyMessage.classList.toggle('d-none', favoriteIds.length > 0);
}

function addToCart(id) {
    cartIds.push(id);
    saveToStorage('cartIds', cartIds);
    showCart();
    showToast(findDrinkById(id).name + ' added to cart');
}

function removeFromCart(index) {
    cartIds.splice(index, 1);
    saveToStorage('cartIds', cartIds);
    showCart();
}

function toggleFavorite(id) {
    if (favoriteIds.includes(id)) {
        favoriteIds = favoriteIds.filter(function (favoriteId) {
            return favoriteId !== id;
        });
    } else {
        favoriteIds.push(id);
    }
    saveToStorage('favoriteIds', favoriteIds);
    showFavorites();
}

function placeOrder() {
    const total = calculateTotal(cartIds);
    cartIds = [];
    saveToStorage('cartIds', cartIds);
    showCart();
    showToast('Thank you! Your order for ' + total + 'tg is accepted');
}

function handleMenuClick(event) {
    const button = event.target.closest('button');
    if (button === null) {
        return;
    }
    const id = Number(button.dataset.id);
    if (button.dataset.action === 'add') {
        addToCart(id);
    } else {
        toggleFavorite(id);
        button.classList.toggle('active');
    }
}

function handleCartClick(event) {
    const button = event.target.closest('button');
    if (button !== null) {
        removeFromCart(Number(button.dataset.index));
    }
}

document.addEventListener('DOMContentLoaded', function () {
    updateMenu();
    showCart();
    showFavorites();
});

searchInput.addEventListener('input', updateMenu);
typeFilter.addEventListener('change', updateMenu);
menuBody.addEventListener('click', handleMenuClick);
cartList.addEventListener('click', handleCartClick);
orderButton.addEventListener('click', placeOrder);