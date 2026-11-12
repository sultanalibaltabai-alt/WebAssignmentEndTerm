function showReviewMessage(text) {
    $('#review-message').text(text).stop(true, true).fadeIn(200).delay(2000).fadeOut(400);
}

function slideDownNewReview() {
    $('#review-list .review-item').first().hide().slideDown(300);
}

function fadeOutReview(item, afterFade) {
    $(item).fadeOut(300, afterFade);
}
