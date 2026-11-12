const drinks = drinkData.map(function (item) {
    return new Drink(item.id, item.name, item.type, item.size, item.price, item.bestSeller);
});
const cart = new Cart('cartIds');
const favorites = new FavoriteList('favoriteIds');

const searchInput = document.getElementById('search-input');
const typeFilter = document.getElementById('type-filter');
const sortSelect = document.getElementById('sort-select');
const priceRange = document.getElementById('price-range');
const priceLabel = document.getElementById('price-label');
const resetButton = document.getElementById('reset-filters');
const menuBody = document.getElementById('menu-body');
const noResultsMessage = document.getElementById('no-results');
const cartList = document.getElementById('cart-list');
const cartEmptyMessage = document.getElementById('cart-empty');
const cartTotal = document.getElementById('cart-total');
const orderButton = document.getElementById('order-button');
const clearCartButton = document.getElementById('clear-cart');
const favoritesList = document.getElementById('favorites-list');
const favoritesEmptyMessage = document.getElementById('favorites-empty');
const clearFavoritesButton = document.getElementById('clear-favorites');

function findDrinkById(id) {
    return drinks.find(function (drink) {
        return drink.id === id;
    });
}

function filterDrinks(searchText, type, maxPrice) {
    return drinks.filter(function (drink) {
        return drink.matchesSearch(searchText)
            && drink.matchesType(type)
            && drink.isNotMoreExpensiveThan(maxPrice);
    });
}

function sortDrinks(drinksToSort, sortType) {
    const sortedDrinks = [...drinksToSort];
    if (sortType === 'name') {
        sortedDrinks.sort(function (first, second) {
            return first.name.localeCompare(second.name);
        });
    }
    if (sortType === 'price-low') {
        sortedDrinks.sort(function (first, second) {
            return first.price - second.price;
        });
    }
    if (sortType === 'price-high') {
        sortedDrinks.sort(function (first, second) {
            return second.price - first.price;
        });
    }
    return sortedDrinks;
}

function calculateTotal(ids) {
    let total = 0;
    for (const id of ids) {
        total += findDrinkById(id).price;
    }
    return total;
}

function setupPriceRange() {
    const prices = drinks.map(function (drink) {
        return drink.price;
    });
    priceRange.min = Math.min(...prices);
    priceRange.max = Math.max(...prices);
    priceRange.value = priceRange.max;
}

function applyTypeFromAddress() {
    const type = new URLSearchParams(window.location.search).get('type');
    if (type === 'Hot' || type === 'Cold') {
        typeFilter.value = type;
    }
}

function createDrinkRow(drink) {
    const row = document.createElement('tr');
    const favoriteClass = favorites.has(drink.id) ? 'active' : '';

    if (drink.bestSeller) {
        row.classList.add('highlight-row');
    }

    row.innerHTML = `
        <td>${drink.getTitle()}</td>
        <td>${drink.type}</td>
        <td>${drink.size}</td>
        <td>${drink.getPriceText()}</td>
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
    priceLabel.textContent = priceRange.value + 'tg';
    const filteredDrinks = filterDrinks(searchInput.value, typeFilter.value, Number(priceRange.value));
    showDrinks(sortDrinks(filteredDrinks, sortSelect.value));
}

function resetFilters() {
    searchInput.value = '';
    typeFilter.value = 'all';
    sortSelect.value = 'default';
    priceRange.value = priceRange.max;
    updateMenu();
}

function createCartItem(drink, index) {
    const item = document.createElement('li');
    item.className = 'cart-item';
    item.innerHTML = `
        <span>${drink.name} - ${drink.getPriceText()}</span>
        <button type="button" class="action-button" data-index="${index}">Remove</button>
    `;
    return item;
}

function showCart() {
    cartList.innerHTML = '';
    cart.ids.forEach(function (id, index) {
        cartList.appendChild(createCartItem(findDrinkById(id), index));
    });
    cartTotal.textContent = calculateTotal(cart.ids) + 'tg';
    cartEmptyMessage.classList.toggle('d-none', !cart.isEmpty());
    orderButton.disabled = cart.isEmpty();
    clearCartButton.disabled = cart.isEmpty();
}

function showFavorites() {
    favoritesList.innerHTML = '';
    for (const id of favorites.ids) {
        const item = document.createElement('li');
        item.textContent = findDrinkById(id).name;
        favoritesList.appendChild(item);
    }
    favoritesEmptyMessage.classList.toggle('d-none', !favorites.isEmpty());
    clearFavoritesButton.disabled = favorites.isEmpty();
}

function addToCart(id) {
    cart.add(id);
    showCart();
    showToast(findDrinkById(id).name + ' added to cart');
}

function removeFromCart(index) {
    cart.removeAt(index);
    showCart();
}

function clearCart() {
    cart.clear();
    showCart();
    showToast('Cart cleared');
}

function placeOrder() {
    const total = calculateTotal(cart.ids);
    cart.clear();
    showCart();
    showToast('Thank you! Your order for ' + total + 'tg is accepted');
}

function clearFavorites() {
    favorites.clear();
    showFavorites();
    updateMenu();
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
        favorites.toggle(id);
        showFavorites();
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
    const validIds = drinks.map(function (drink) {
        return drink.id;
    });
    cart.keepOnly(validIds);
    favorites.keepOnly(validIds);
    setupPriceRange();
    applyTypeFromAddress();
    updateMenu();
    showCart();
    showFavorites();
});

searchInput.addEventListener('input', updateMenu);
typeFilter.addEventListener('change', updateMenu);
sortSelect.addEventListener('change', updateMenu);
priceRange.addEventListener('input', updateMenu);
resetButton.addEventListener('click', resetFilters);
menuBody.addEventListener('click', handleMenuClick);
cartList.addEventListener('click', handleCartClick);
orderButton.addEventListener('click', placeOrder);
clearCartButton.addEventListener('click', clearCart);
clearFavoritesButton.addEventListener('click', clearFavorites);drinkData