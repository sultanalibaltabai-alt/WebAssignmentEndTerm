const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast?latitude=51.18&longitude=71.45&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=5&timezone=auto';

const WEATHER_NAMES = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Cloudy',
    45: 'Fog',
    48: 'Fog',
    51: 'Light drizzle',
    53: 'Drizzle',
    55: 'Heavy drizzle',
    61: 'Light rain',
    63: 'Rain',
    65: 'Heavy rain',
    71: 'Light snow',
    73: 'Snow',
    75: 'Heavy snow',
    80: 'Rain showers',
    95: 'Thunderstorm'
};

function getWeatherName(weatherCode) {
    return WEATHER_NAMES[weatherCode] || 'Changing weather';
}

class DayForecast {
    constructor(date, minTemperature, maxTemperature, weatherCode) {
        this.date = date;
        this.minTemperature = minTemperature;
        this.maxTemperature = maxTemperature;
        this.weatherCode = weatherCode;
    }

    getDayName() {
        return new Date(this.date).toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' });
    }

    getWeatherName() {
        return getWeatherName(this.weatherCode);
    }

    getRangeText() {
        return Math.round(this.minTemperature) + '° / ' + Math.round(this.maxTemperature) + '°';
    }
}

function createForecast(daily) {
    const forecast = [];
    daily.time.forEach(function (date, index) {
        forecast.push(new DayForecast(
            date,
            daily.temperature_2m_min[index],
            daily.temperature_2m_max[index],
            daily.weather_code[index]
        ));
    });
    return forecast;
}

async function fetchWeather() {
    const response = await fetch(WEATHER_URL);
    if (!response.ok) {
        throw new Error('Weather server error: ' + response.status);
    }
    const data = await response.json();
    if (!data.current || !data.daily) {
        return null;
    }
    return {
        temperature: Math.round(data.current.temperature_2m),
        description: getWeatherName(data.current.weather_code),
        forecast: createForecast(data.daily)
    };
}
