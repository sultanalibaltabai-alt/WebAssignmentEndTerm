class Drink {
    constructor(id, name, type, size, price, bestSeller) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.size = size;
        this.price = price;
        this.bestSeller = bestSeller;
    }

    matchesSearch(searchText) {
        return this.name.toLowerCase().includes(searchText.trim().toLowerCase());
    }

    matchesType(type) {
        return type === 'all' || this.type === type;
    }

    isNotMoreExpensiveThan(maxPrice) {
        return this.price <= maxPrice;
    }

    getPriceText() {
        return this.price + 'tg';
    }

    getTitle() {
        return this.bestSeller ? this.name + ' (Best seller)' : this.name;
    }
}

class StoredList {
    constructor(storageKey) {
        this.storageKey = storageKey;
        this.ids = loadListFromStorage(storageKey);
    }

    save() {
        saveToStorage(this.storageKey, this.ids);
    }

    clear() {
        this.ids = [];
        this.save();
    }

    isEmpty() {
        return this.ids.length === 0;
    }

    keepOnly(validIds) {
        this.ids = this.ids.filter(function (id) {
            return validIds.includes(id);
        });
        this.save();
    }
}

class Cart extends StoredList {
    add(id) {
        this.ids.push(id);
        this.save();
    }

    removeAt(index) {
        this.ids.splice(index, 1);
        this.save();
    }
}

class FavoriteList extends StoredList {
    has(id) {
        return this.ids.includes(id);
    }

    toggle(id) {
        if (this.has(id)) {
            this.ids = this.ids.filter(function (favoriteId) {
                return favoriteId !== id;
            });
        } else {
            this.ids.push(id);
        }
        this.save();
    }
}