class Weather {
    constructor(country, state) {
        this.apiKey = '7568fd518fb70f581d083bcc28813b81';
        this.country = country;
        this.state = state;
    }
    async getWeather() {

        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${this.country},${this.state}&units=metric&appid=${this.apiKey}`;
        
        console.log(URL);

        const response = await fetch(URL);
        
        const responseData = await response.json();

        return responseData;
        
    }
    
    changeLocation(country, state){
        this.country = country;
        this.state = state;
    }
}

const weather = new Weather("argentina", "buenosaires");

class UI {
    constructor() {
        this.location = document.getElementById('w-location');
        this.desc = document.getElementById('w-desc');
        this.temp = document.getElementById('w-temp');
        this.icon = document.getElementById('w-icon');
        this.humidity = document.getElementById('w-humidity');
        this.pressure = document.getElementById('w-pressure');
        this.feelsLike = document.getElementById('w-feels-like');
        this.wind = document.getElementById('w-wind');

    }

    paint(weather) {
        this.location.textContent = weather.name;
        const text = weather.weather;
        this.desc.textContent = text[0].description;
        this.icon.setAttribute('src', `http://openweathermap.org/img/wn/${text[0].icon}@2x.png`);
        this.temp.textContent = `${weather.main.temp}°C`;
        this.feelsLike.textContent = `Feels Like: ${weather.main.feels_like}°C`;
        this.humidity.textContent = `Relative Humidity: ${weather.main.humidity} %`;
        this.pressure.textContent = `Pressure: ${weather.main.pressure} hPa`;
        const wspeed = weather.wind.speed*3.6;
        this.wind.textContent = `Wind Speed: ${wspeed.toFixed(2)} km/h. Wind Deg: ${weather.wind.deg}°`;
    }
}

const ui = new UI();


document.addEventListener('DOMContentLoaded', getWeather);

document.getElementById('w-change-btn').addEventListener('click', (e) => {
    const country = document.getElementById('country').value;
    const state = document.getElementById('state').value;
    const description = `${country}, ${state}`;

    console.log(description);

    weather.changeLocation(`${country}`,`${state}`);

    getWeather();

    $("#locModal").modal('hide');

});

console.log(weather.state);

function getWeather(){
    weather.getWeather()
        .then(results => {
            ui.paint(results);
        })
        .catch(err => console.log(err));
}

//some changes 2