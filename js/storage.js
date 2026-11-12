function loadFromStorage(key, defaultValue) {
    try {
        const savedValue = localStorage.getItem(key);
        if (savedValue === null) {
            return defaultValue;
        }
        return JSON.parse(savedValue);
    } catch (error) {
        return defaultValue;
    }
}

function loadListFromStorage(key) {
    const savedList = loadFromStorage(key, []);
    return Array.isArray(savedList) ? savedList : [];
}

function saveToStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        return false;
    }
    return true;
}
