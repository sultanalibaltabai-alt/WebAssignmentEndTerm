const galleryContainer = document.getElementById('gallery');

function createPhotoFigure(photo, index) {
    const figure = document.createElement('figure');
    figure.dataset.index = index;
    figure.innerHTML = `
        <img src="${photo.src}" alt="${photo.alt}">
        <figcaption>${photo.caption}</figcaption>
    `;
    return figure;
}

function showGallery() {
    galleryPhotos.forEach(function (photo, index) {
        galleryContainer.appendChild(createPhotoFigure(photo, index));
    });
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox !== null) {
        lightbox.remove();
    }
}

function openLightbox(photo) {
    closeLightbox();
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.innerHTML = `
        <figure>
            <img src="${photo.src}" alt="${photo.alt}">
            <figcaption>${photo.caption}</figcaption>
            <button type="button" id="lightbox-close" aria-label="Close photo">&times;</button>
        </figure>
    `;
    lightbox.addEventListener('click', closeLightbox);
    document.body.appendChild(lightbox);
    fadeInLightbox();
}

function handleGalleryClick(event) {
    const figure = event.target.closest('figure');
    if (figure !== null) {
        openLightbox(galleryPhotos[figure.dataset.index]);
    }
}

function handleKeyPress(event) {
    if (event.key === 'Escape') {
        closeLightbox();
    }
}

document.addEventListener('DOMContentLoaded', function () {
    showGallery();
    fadeInPhotos();
});
galleryContainer.addEventListener('click', handleGalleryClick);
document.addEventListener('keydown', handleKeyPress);
