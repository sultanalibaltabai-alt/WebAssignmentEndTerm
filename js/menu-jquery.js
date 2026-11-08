const SCROLL_LIMIT = 300;

function createToast() {
    $('<div>', { id: 'toast', role: 'status' }).appendTo('body');
}

function showToast(message) {
    $('#toast').text(message).stop(true, true).fadeIn(200).delay(1800).fadeOut(400);
}

function createBackToTopButton() {
    const button = $('<button>', {
        type: 'button',
        id: 'back-to-top',
        'aria-label': 'Back to top',
        html: '&uarr;'
    });
    button.on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 500);
    });
    $('body').append(button);
    return button;
}

function showButtonOnScroll(button) {
    let isButtonShown = false;
    $(window).on('scroll', function () {
        const mustShow = $(window).scrollTop() > SCROLL_LIMIT;
        if (mustShow === isButtonShown) {
            return;
        }
        isButtonShown = mustShow;
        if (mustShow) {
            button.stop(true, true).fadeIn();
        } else {
            button.stop(true, true).fadeOut();
        }
    });
}

$(function () {
    createToast();
    showButtonOnScroll(createBackToTopButton());
});