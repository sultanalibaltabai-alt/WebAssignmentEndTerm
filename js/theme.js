const themeButton = document.getElementById('theme-toggle');

function applyTheme(theme) {
    const isDark = theme === 'dark';
    document.body.classList.toggle('dark-theme', isDark);
    themeButton.textContent = isDark ? 'Light mode' : 'Dark mode';
    themeButton.setAttribute('aria-pressed', isDark);
}

function toggleTheme() {
    const isDark = document.body.classList.contains('dark-theme');
    const newTheme = isDark ? 'light' : 'dark';
    saveToStorage('theme', newTheme);
    applyTheme(newTheme);
}

document.addEventListener('DOMContentLoaded', function () {
    applyTheme(loadFromStorage('theme', 'light'));
});

themeButton.addEventListener('click', toggleTheme);
