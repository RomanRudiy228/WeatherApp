const searchInput = document.querySelector('#searchInput');
const searchButton = document.querySelector('#searchBtn');
const weatherIcon = document.querySelector('.weather-icon');
const windSpeed = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weather = document.querySelector('.temp');
const city = document.querySelector('.city');

const setWeatherDetails = (data) => {
    console.log(data);
    city.innerHTML = data.name;
    weather.innerHTML = Math.round(data.main.temp - 273.15) + "°C";
    humidity.innerHTML = data.main.humidity + "%";
    windSpeed.innerHTML = data.wind.speed + "km/h";
    switch (data.weather[0].main) {
        case "Clouds":
            weatherIcon.src = "/images/clouds.png";
            break;
        case "Clear":
            weatherIcon.src = "/images/clear.png";
            break;
        case "Rain":
            weatherIcon.src = "/images/rain.png";
            break;
        case "Mist":
            weatherIcon.src = "/images/mist.png";
            break;
        case "Snow":
            weatherIcon.src = "/images/snow.png";
            break;
        case "Haze":
            weatherIcon.src = "/images/haze.png";
            break;
        default:
            weatherIcon.src = ""; 
            break;
    }
};

const callAPI = () => {
    const apiKey = "3302b887c2dacbbf564e81c1cad9e70e";
    const cityValue = searchInput.value;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}`)
        .then((response) => {
            if (!response.ok) {
                alert("Check spelling of City and try again or Something Went Wrong!");
                throw new Error(`Request failed with status ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            setWeatherDetails(data);
        })
        .catch((error) => console.log(error));
};

searchButton.addEventListener('click', () => {
    if (searchInput.value === "") {
        alert("Please Enter City Name.");
    } else {
        callAPI();
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        searchButton.click();
    }
});
searchButton.click();
