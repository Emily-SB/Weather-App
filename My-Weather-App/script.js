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


function formatDate(dateString) {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric"
    });
}


async function showWeather() {

    const latitude = 9.5916;
    const longitude = 76.5222;

    const temperature = document.getElementById("temperature");
    const humidity = document.getElementById("humidity");
    const condition = document.getElementById("condition");
    const icon = document.getElementById("weather-icon");
    const forecastContainer = document.getElementById("forecast-container");

    try {

        temperature.textContent = "Loading...";
        humidity.textContent = "";
        condition.textContent = "";
        icon.textContent = "🌤️";
        forecastContainer.innerHTML = "";

        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`
        );

        const data = await response.json();

        const currentTemperature = data.current.temperature_2m;
        const currentHumidity = data.current.relative_humidity_2m;
        const weatherCode = data.current.weather_code;

        const description = getWeatherDescription(weatherCode);
        const weatherIcon = getWeatherIcon(weatherCode);

        temperature.textContent =
            currentTemperature + "°C";

        humidity.textContent =
            "Humidity: " + currentHumidity + "%";

        condition.textContent =
            description;

        icon.textContent = weatherIcon;


        const dates = data.daily.time;
        const maxTemperatures = data.daily.temperature_2m_max;
        const minTemperatures = data.daily.temperature_2m_min;
        const forecastCodes = data.daily.weather_code;


        for (let i = 0; i < dates.length; i++) {

            const day = document.createElement("div");

            day.className = "forecast-day";

            day.innerHTML = `
                <p class="forecast-date">${formatDate(dates[i])}</p>

                <p class="forecast-icon">
                    ${getWeatherIcon(forecastCodes[i])}
                </p>

                <p class="forecast-condition">
                    ${getWeatherDescription(forecastCodes[i])}
                </p>

                <p class="forecast-temp">
                    <strong>${maxTemperatures[i]}°</strong>
                    <span>${minTemperatures[i]}°</span>
                </p>
            `;

            forecastContainer.appendChild(day);
        }

    } catch (error) {

        temperature.textContent = "Unable to get weather";
        humidity.textContent = "";
        condition.textContent = "Please try again.";
        icon.textContent = "⚠️";

        forecastContainer.innerHTML = "";

        console.error("Weather error:", error);
    }
}