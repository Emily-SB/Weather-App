function getWeatherDescription(code) {
    if (code === 0) {
        return "Clear sky";
    } else if (code === 1 || code === 2 || code === 3) {
        return "Partly cloudy";
    } else if (code === 45 || code === 48) {
        return "Foggy";
    } else if (code >= 51 && code <= 67) {
        return "Rain";
    } else if (code >= 71 && code <= 77) {
        return "Snow";
    } else if (code >= 80 && code <= 82) {
        return "Rain showers";
    } else if (code >= 95) {
        return "Thunderstorm";
    } else {
        return "Unknown weather";
    }
}

function getWeatherIcon(code) {
    if (code === 0) {
        return "☀️";
    } else if (code === 1 || code === 2 || code === 3) {
        return "🌤️";
    } else if (code === 45 || code === 48) {
        return "🌫️";
    } else if (code >= 51 && code <= 67) {
        return "🌧️";
    } else if (code >= 71 && code <= 77) {
        return "❄️";
    } else if (code >= 80 && code <= 82) {
        return "🌦️";
    } else if (code >= 95) {
        return "⛈️";
    } else {
        return "❓";
    }
}

async function showWeather() {
    const latitude = 9.5916;
    const longitude = 76.5222;

    const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code`
    );

    const data = await response.json();

    const temperature = data.current.temperature_2m;
    const humidity = data.current.relative_humidity_2m;
    const weatherCode = data.current.weather_code;
    const description = getWeatherDescription(weatherCode);
    const icon = getWeatherIcon(weatherCode);
    const temperatureElement = document.getElementById("temperature");
    const humidityElement = document.getElementById("humidity");
    const conditionElement = document.getElementById("condition");

temperatureElement.textContent = "Temperature: " + temperature + "°C";
humidityElement.textContent = "Humidity: " + humidity + "%";
conditionElement.textContent = "Condition: " + description;
document.getElementById("weather-icon").textContent = icon;
}