const API_KEY = 'your_api_key_here';
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
    alert("Geolocation error: " + error.message);
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
    const images = {
        clear: 'clear-sky.jpg',
        clouds: 'cloudy.jpg',
        rain: 'rainy.jpg',
        thunderstorm: 'thunderstorm.jpg',
        default: 'default-weather.jpg'
    };
    body.style.backgroundImage = `url('${images[weatherCondition.toLowerCase()] || images.default}')`;
}

getLocation();



