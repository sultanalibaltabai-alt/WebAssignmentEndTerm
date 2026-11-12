const WEATHER_STATES = ['loading', 'error', 'empty', 'content'];
const COLD_LIMIT = 15;

const forecastList = document.getElementById('forecast-list');
const retryButton = document.getElementById('weather-retry');

function showWeatherState(activeState) {
    for (const state of WEATHER_STATES) {
        document.getElementById('weather-' + state).classList.toggle('d-none', state !== activeState);
    }
}

function getDrinkType(temperature) {
    return temperature < COLD_LIMIT ? 'Hot' : 'Cold';
}

function createForecastCard(day) {
    const card = document.createElement('article');
    card.className = 'forecast-day';
    card.innerHTML = `
        <h3>${day.getDayName()}</h3>
        <p>${day.getWeatherName()}</p>
        <p class="price">${day.getRangeText()}</p>
    `;
    return card;
}

function showWeather(weather) {
    const drinkType = getDrinkType(weather.temperature);
    document.getElementById('weather-temp').textContent = weather.temperature + '°C';
    document.getElementById('weather-description').textContent = weather.description;
    document.getElementById('weather-advice').textContent =
        'It is ' + weather.temperature + '°C in Astana right now. Try our ' + drinkType.toLowerCase() + ' drinks!';
    document.getElementById('weather-link').href = 'menu.html?type=' + drinkType;

    forecastList.innerHTML = '';
    for (const day of weather.forecast) {
        forecastList.appendChild(createForecastCard(day));
    }
    showWeatherState('content');
    fadeInForecast();
}

async function loadWeather() {
    showWeatherState('loading');
    try {
        const weather = await fetchWeather();
        if (weather === null || weather.forecast.length === 0) {
            showWeatherState('empty');
            return;
        }
        showWeather(weather);
    } catch (error) {
        showWeatherState('error');
    }
}

document.addEventListener('DOMContentLoaded', loadWeather);
retryButton.addEventListener('click', loadWeather);
