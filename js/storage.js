function loadFromStorage(key, defaultValue) {
    const savedValue = localStorage.getItem(key);
    if (savedValue === null) {
        return defaultValue;
    }
    return JSON.parse(savedValue);
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
