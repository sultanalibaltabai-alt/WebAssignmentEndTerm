const TEXTAREA_SMALL_HEIGHT = '100px';
const TEXTAREA_BIG_HEIGHT = '170px';

function showSuccess(text) {
    $('#form-success').text(text).hide().fadeIn(400);
}

function hideSuccess() {
    $('#form-success').hide();
}

function shakeForm() {
    $('#contact-form')
        .animate({ marginLeft: '-12px' }, 60)
        .animate({ marginLeft: '12px' }, 60)
        .animate({ marginLeft: '0px' }, 60);
}

function growMessageField() {
    $(this).stop().animate({ height: TEXTAREA_BIG_HEIGHT }, 200);
}

function shrinkMessageField() {
    if ($(this).val() === '') {
        $(this).stop().animate({ height: TEXTAREA_SMALL_HEIGHT }, 200);
    }
}

$(function () {
    $('#message').on('focus', growMessageField).on('blur', shrinkMessageField);
});
