const PHOTO_DELAY = 150;

function fadeInPhotos() {
    $('#gallery figure').hide().each(function (index) {
        $(this).delay(index * PHOTO_DELAY).fadeIn(400);
    });
}

function fadeInLightbox() {
    $('#lightbox').hide().fadeIn(250);
}
