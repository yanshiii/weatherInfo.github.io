const API_KEY = 'fadfa28f7146e830e8851ea0361e637b';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_API_URL = 'https://api.openweathermap.org/data/2.5/forecast';

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    fetchWeatherData(lat, lon);
    fetchForecastData(lat, lon);
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

function fetchWeatherData(lat, lon) {
    fetch(`${WEATHER_API_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            displayCurrentWeather(data);
            setBackground(data.weather[0].main);
        })
        .catch(error => console.error('Error:', error));
}

function fetchForecastData(lat, lon) {
    fetch(`${FORECAST_API_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => displayForecast(data))
        .catch(error => console.error('Error:', error));
}

function displayCurrentWeather(data) {
    document.getElementById('location').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('description').textContent = data.weather[0].description;
}

function displayForecast(data) {
    const forecastContainer = document.getElementById('forecast-container');
    forecastContainer.innerHTML = '';

    for (let i = 0; i < data.list.length; i += 8) {
        const forecast = data.list[i];
        const date = new Date(forecast.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

        const forecastDay = document.createElement('div');
        forecastDay.classList.add('forecast-day');
        forecastDay.innerHTML = `
            <h3>${dayName}</h3>
            <p>Temp: ${forecast.main.temp}°C</p>
            <p>Humidity: ${forecast.main.humidity}%</p>
            <p>${forecast.weather[0].description}</p>
        `;
        forecastContainer.appendChild(forecastDay);
    }
}

function setBackground(weatherCondition) {
    const body = document.body;
    switch (weatherCondition.toLowerCase()) {
        case 'clear':
            body.style.backgroundImage = "url('images.jpeg')";
            break;
        case 'clouds':
            body.style.backgroundImage = "url('images.jpeg')";
            break;
        case 'rain':
            body.style.backgroundImage = "url('images.jpeg')";
            break;
        case 'thunderstorm':
            body.style.backgroundImage = "url('images.jpeg')";
            break;
        default:
            body.style.backgroundImage = "url('images.jpeg')";
    }
}

getLocation();