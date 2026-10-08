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

    const temperature = document.getElementById("temperature");
    const humidity = document.getElementById("humidity");
    const condition = document.getElementById("condition");
    const icon = document.getElementById("weather-icon");

    try {
        temperature.textContent = "Loading...";
        humidity.textContent = "";
        condition.textContent = "";

        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code`
        );

        const data = await response.json();

        const currentTemperature = data.current.temperature_2m;
        const currentHumidity = data.current.relative_humidity_2m;
        const weatherCode = data.current.weather_code;

        const description = getWeatherDescription(weatherCode);
        const weatherIcon = getWeatherIcon(weatherCode);

        temperature.textContent =
            "Temperature: " + currentTemperature + "°C";

        humidity.textContent =
            "Humidity: " + currentHumidity + "%";

        condition.textContent =
            "Condition: " + description;

        icon.textContent = weatherIcon;

    } catch (error) {
        temperature.textContent = "Unable to get weather";
        humidity.textContent = "";
        condition.textContent = "Please try again.";
        icon.textContent = "⚠️";

        console.error("Weather error:", error);
    }
}