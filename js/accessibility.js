const DEFAULT_FONT_SIZE = 16;
const MIN_FONT_SIZE = 12;
const MAX_FONT_SIZE = 22;
const FONT_STEP = 2;

const decreaseFontButton = document.getElementById('font-decrease');
const resetFontButton = document.getElementById('font-reset');
const increaseFontButton = document.getElementById('font-increase');

let fontSize = DEFAULT_FONT_SIZE;

function isValidFontSize(size) {
    return typeof size === 'number' && size >= MIN_FONT_SIZE && size <= MAX_FONT_SIZE;
}

function applyFontSize(size) {
    fontSize = size;
    document.documentElement.style.fontSize = size + 'px';
    decreaseFontButton.disabled = size <= MIN_FONT_SIZE;
    increaseFontButton.disabled = size >= MAX_FONT_SIZE;
    saveToStorage('fontSize', size);
}

function changeFontSize(step) {
    applyFontSize(fontSize + step);
}

document.addEventListener('DOMContentLoaded', function () {
    const savedSize = loadFromStorage('fontSize', DEFAULT_FONT_SIZE);
    applyFontSize(isValidFontSize(savedSize) ? savedSize : DEFAULT_FONT_SIZE);
});

decreaseFontButton.addEventListener('click', function () {
    changeFontSize(-FONT_STEP);
});

resetFontButton.addEventListener('click', function () {
    applyFontSize(DEFAULT_FONT_SIZE);
});

increaseFontButton.addEventListener('click', function () {
    changeFontSize(FONT_STEP);
});
