const MIN_NAME_LENGTH = 2;
const MIN_TEXT_LENGTH = 10;
const MAX_TEXT_LENGTH = 200;
const NAME_PATTERN = /^[\p{L}\s'-]+$/u;

const reviewList = new ReviewList('reviews');
let editingId = null;

const reviewForm = document.getElementById('review-form');
const nameField = document.getElementById('review-name');
const ratingField = document.getElementById('review-rating');
const textField = document.getElementById('review-text');
const textCounter = document.getElementById('review-text-counter');
const submitButton = document.getElementById('review-submit');
const cancelButton = document.getElementById('review-cancel');
const reviewsContainer = document.getElementById('review-list');
const emptyMessage = document.getElementById('reviews-empty');
const clearAllButton = document.getElementById('clear-reviews');
const totalElement = document.getElementById('stats-total');
const averageElement = document.getElementById('stats-average');
const barsContainer = document.getElementById('stats-bars');

function validateName(value) {
    const name = value.trim();
    if (name === '') {
        return 'Please enter your name.';
    }
    if (name.length < MIN_NAME_LENGTH) {
        return 'Name must have at least ' + MIN_NAME_LENGTH + ' letters.';
    }
    if (!NAME_PATTERN.test(name)) {
        return 'Name can contain only letters.';
    }
    return '';
}

function validateRating(value) {
    if (value === '') {
        return 'Please choose a rating.';
    }
    return '';
}

function validateText(value) {
    const text = value.trim();
    if (text === '') {
        return 'Please write your review.';
    }
    if (text.length < MIN_TEXT_LENGTH) {
        return 'Review must have at least ' + MIN_TEXT_LENGTH + ' characters.';
    }
    if (text.length > MAX_TEXT_LENGTH) {
        return 'Review must have no more than ' + MAX_TEXT_LENGTH + ' characters.';
    }
    return '';
}

const fieldRules = [
    { field: nameField, validate: validateName },
    { field: ratingField, validate: validateRating },
    { field: textField, validate: validateText }
];

function createReviewItem(review) {
    const item = document.createElement('article');
    item.className = 'review-item';
    item.dataset.id = review.id;
    item.innerHTML = `
        <div class="review-top">
            <h3 class="review-name"></h3>
            <span class="review-stars">${review.getStars()}</span>
        </div>
        <p class="review-text"></p>
        <small>${review.getDateText()}</small>
        <div class="review-buttons">
            <button type="button" class="action-button" data-action="edit">Edit</button>
            <button type="button" class="action-button" data-action="delete">Delete</button>
        </div>
    `;
    item.querySelector('.review-name').textContent = review.name;
    item.querySelector('.review-text').textContent = review.text;
    return item;
}

function showReviews() {
    const newestFirst = [...reviewList.reviews].reverse();
    reviewsContainer.innerHTML = '';
    for (const review of newestFirst) {
        reviewsContainer.appendChild(createReviewItem(review));
    }
    emptyMessage.classList.toggle('d-none', newestFirst.length > 0);
    clearAllButton.disabled = newestFirst.length === 0;
}

function createRatingBar(rating) {
    const total = reviewList.reviews.length;
    const count = reviewList.countByRating(rating);
    const percent = total === 0 ? 0 : Math.round(count / total * 100);
    const row = document.createElement('div');
    row.className = 'rating-row';
    row.innerHTML = `
        <span>${rating} ★</span>
        <div class="rating-bar"><div class="rating-bar-fill" style="width: ${percent}%"></div></div>
        <span>${count}</span>
    `;
    return row;
}

function showStatistics() {
    const total = reviewList.reviews.length;
    totalElement.textContent = total;
    averageElement.textContent = total === 0 ? '-' : reviewList.getAverageRating().toFixed(1);
    barsContainer.innerHTML = '';
    for (let rating = MAX_RATING; rating >= 1; rating--) {
        barsContainer.appendChild(createRatingBar(rating));
    }
}

function refreshPage() {
    showReviews();
    showStatistics();
}

function updateTextCounter() {
    textCounter.textContent = textField.value.length + ' / ' + MAX_TEXT_LENGTH;
}

function startEditing(id) {
    const review = reviewList.findById(id);
    editingId = id;
    nameField.value = review.name;
    ratingField.value = String(review.rating);
    textField.value = review.text;
    submitButton.textContent = 'Save Changes';
    cancelButton.classList.remove('d-none');
    clearValidation(fieldRules);
    updateTextCounter();
    nameField.focus();
}

function stopEditing() {
    editingId = null;
    reviewForm.reset();
    submitButton.textContent = 'Add Review';
    cancelButton.classList.add('d-none');
    clearValidation(fieldRules);
    updateTextCounter();
}

function handleSubmit(event) {
    event.preventDefault();
    const firstInvalidField = checkAllFields(fieldRules);
    if (firstInvalidField !== null) {
        firstInvalidField.focus();
        return;
    }

    const name = nameField.value.trim();
    const rating = Number(ratingField.value);
    const text = textField.value.trim();

    if (editingId === null) {
        reviewList.add(name, rating, text);
        stopEditing();
        refreshPage();
        slideDownNewReview();
        showReviewMessage('Thank you! Your review was added.');
    } else {
        reviewList.update(editingId, name, rating, text);
        stopEditing();
        refreshPage();
        showReviewMessage('Review updated.');
    }
}

function deleteReview(id, item) {
    fadeOutReview(item, function () {
        reviewList.remove(id);
        if (editingId === id) {
            stopEditing();
        }
        refreshPage();
        showReviewMessage('Review deleted.');
    });
}

function handleListClick(event) {
    const button = event.target.closest('button');
    if (button === null) {
        return;
    }
    const item = button.closest('.review-item');
    const id = Number(item.dataset.id);
    if (button.dataset.action === 'edit') {
        startEditing(id);
    } else {
        deleteReview(id, item);
    }
}

function clearAllReviews() {
    if (!confirm('Delete all reviews?')) {
        return;
    }
    reviewList.clear();
    stopEditing();
    refreshPage();
    showReviewMessage('All reviews deleted.');
}

for (const rule of fieldRules) {
    watchField(rule);
}

document.addEventListener('DOMContentLoaded', function () {
    refreshPage();
    updateTextCounter();
});

textField.addEventListener('input', updateTextCounter);
reviewForm.addEventListener('submit', handleSubmit);
cancelButton.addEventListener('click', stopEditing);
reviewsContainer.addEventListener('click', handleListClick);
clearAllButton.addEventListener('click', clearAllReviews);
