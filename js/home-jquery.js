const CARD_DELAY = 200;
const DIMMED_OPACITY = 0.6;

function fadeInPopularCards() {
    $('.drink-card').hide().each(function (index) {
        $(this).delay(index * CARD_DELAY).fadeIn(500);
    });
}

function dimOtherCards() {
    $(this).siblings('.drink-card').stop().fadeTo(200, DIMMED_OPACITY);
}

function showAllCards() {
    $('.drink-card').stop().fadeTo(200, 1);
}

$(function () {
    $('#popular-drinks')
        .on('mouseenter', '.drink-card', dimOtherCards)
        .on('mouseleave', '.drink-card', showAllCards);
});
