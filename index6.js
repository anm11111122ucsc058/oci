const searchButton = document.getElementById('searchBtn');
const cityInput = document.getElementById('city');
const weatherInfo = document.getElementById('weatherInfo');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const humidityElement = document.getElementById('humidity');
const windSpeedElement = document.getElementById('windSpeed');

// Replace this with your OpenWeatherMap API Key
const API_KEY = 'YOUR_API_KEY';

// Event listener for the search button
searchButton.addEventListener('click', function () {
    const cityName = cityInput.value;

    if (cityName) {
        getWeather(cityName);
    }
});

async function getWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.cod === 200) {
            updateWeatherInfo(data);
        } else {
            alert("City not found, please try again!");
        }
    } catch (error) {
        alert("Error fetching weather data!");
    }
}

function updateWeatherInfo(data) {
    const { name, main, weather, wind } = data;

    locationElement.textContent = `Location: ${name}`;
    temperatureElement.textContent = `Temperature: ${main.temp}°C`;
    descriptionElement.textContent = `Weather: ${weather[0].description}`;
    humidityElement.textContent = `Humidity: ${main.humidity}%`;
    windSpeedElement.textContent = `Wind Speed: ${wind.speed} m/s`;

    weatherInfo.style.display = 'block';
}
