const API_KEY = "debdd030741939a5551b5114c84e4580";
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");
const recentCities = document.getElementById("recentCities");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const wind = document.getElementById("wind");
const humidity = document.getElementById("humidity");
const weatherIcon = document.getElementById("weatherIcon");
const forecast = document.getElementById("forecast");

// Load recent cities from localStorage
let recentSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
if (recentSearches.length > 0) {
    recentCities.classList.remove("hidden");
    recentSearches.forEach(city => {
        const option = document.createElement("option");
        option.value = city;
        option.textContent = city;
        recentCities.appendChild(option);
    });
}

// Function to fetch weather data by city
async function fetchWeatherByCity(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        if (!response.ok) throw new Error("City not found");
        const data = await response.json();
        displayCurrentWeather(data);
        fetchForecast(city);

        // Add to recent searches
        if (!recentSearches.includes(city)) {
            recentSearches.push(city);
            localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
            const option = document.createElement("option");
            option.value = city;
            option.textContent = city;
            recentCities.appendChild(option);
            recentCities.classList.remove("hidden");
        }
    } catch (error) {
        alert(error.message);
    }
}

// Function to fetch weather data by coordinates
async function fetchWeatherByCoords(lat, lon) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        displayCurrentWeather(data);
        fetchForecast(data.name);
    } catch (error) {
        alert("Unable to fetch weather for your location.");
    }
}

// Function to fetch 5-day forecast
async function fetchForecast(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        displayForecast(data);
    } catch (error) {
        alert("Unable to fetch forecast.");
    }
}

// Function to display current weather
function displayCurrentWeather(data) {
    const date = new Date().toISOString().split("T")[0];
    cityName.textContent = `${data.name} (${date})`;
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    wind.textContent = `Wind: ${data.wind.speed} M/S`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    weatherIcon.textContent = getWeatherIcon(data.weather[0].main);
}

// Function to display 5-day forecast
function displayForecast(data) {
    forecast.innerHTML = "";
    const dailyData = data.list.filter(item => item.dt_txt.includes("12:00:00"));
    dailyData.slice(0, 5).forEach(day => {
        const date = new Date(day.dt_txt).toISOString().split("T")[0];
        const div = document.createElement("div");
        div.className = "bg-gray-200 p-2 rounded text-center";
        div.innerHTML = `
            <p class="font-semibold">(${date})</p>
            <p class="text-2xl">${getWeatherIcon(day.weather[0].main)}</p>
            <p>Temp: ${day.main.temp}°C</p>
            <p>Wind: ${day.wind.speed} M/S</p>
            <p>Humidity: ${day.main.humidity}%</p>
        `;
        forecast.appendChild(div);
    });
}

// Function to map weather conditions to icons
function getWeatherIcon(condition) {
    switch (condition.toLowerCase()) {
        case "clear": return "☀️";
        case "clouds": return "☁️";
        case "rain": return "🌧️";
        case "snow": return "❄️";
        default: return "🌫️";
    }
}

// Event listener for search button
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (!city) {
        alert("Please enter a city name.");
        return;
    }
    fetchWeatherByCity(city);
});

// Event listener for location button
locationBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            fetchWeatherByCoords(latitude, longitude);
        }, () => {
            alert("Unable to access your location.");
        });
    } else {
        alert("Geolocation is not supported by your browser.");
    }
});

// Event listener for recent cities dropdown
recentCities.addEventListener("change", (e) => {
    const city = e.target.value;
    if (city) {
        fetchWeatherByCity(city);
    }
});