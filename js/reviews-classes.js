const MAX_RATING = 5;

class Review {
    constructor(id, name, rating, text, date) {
        this.id = id;
        this.name = name;
        this.rating = rating;
        this.text = text;
        this.date = date;
    }

    getStars() {
        return '★'.repeat(this.rating) + '☆'.repeat(MAX_RATING - this.rating);
    }

    getDateText() {
        return new Date(this.date).toLocaleDateString('en-GB');
    }
}

function isValidReview(item) {
    return typeof item === 'object'
        && item !== null
        && typeof item.id === 'number'
        && typeof item.name === 'string'
        && Number.isInteger(item.rating)
        && item.rating >= 1
        && item.rating <= MAX_RATING
        && typeof item.text === 'string'
        && typeof item.date === 'string';
}

class ReviewList {
    constructor(storageKey) {
        this.storageKey = storageKey;
        this.reviews = loadListFromStorage(storageKey)
            .filter(isValidReview)
            .map(function (item) {
                return new Review(item.id, item.name, item.rating, item.text, item.date);
            });
    }

    save() {
        saveToStorage(this.storageKey, this.reviews);
    }

    add(name, rating, text) {
        const review = new Review(Date.now(), name, rating, text, new Date().toISOString());
        this.reviews.push(review);
        this.save();
        return review;
    }

    findById(id) {
        return this.reviews.find(function (review) {
            return review.id === id;
        });
    }

    update(id, name, rating, text) {
        const review = this.findById(id);
        review.name = name;
        review.rating = rating;
        review.text = text;
        this.save();
    }

    remove(id) {
        this.reviews = this.reviews.filter(function (review) {
            return review.id !== id;
        });
        this.save();
    }

    clear() {
        this.reviews = [];
        this.save();
    }

    countByRating(rating) {
        return this.reviews.filter(function (review) {
            return review.rating === rating;
        }).length;
    }

    getAverageRating() {
        if (this.reviews.length === 0) {
            return 0;
        }
        let sum = 0;
        for (const review of this.reviews) {
            sum += review.rating;
        }
        return sum / this.reviews.length;
    }
}
