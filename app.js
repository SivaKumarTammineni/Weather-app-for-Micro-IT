const valueSearch = document.getElementById('valueSearch');
const city = document.getElementById("city");
const temperature = document.getElementById("temperature");
const description = document.querySelector('.description');
const clouds = document.getElementById("clouds");
const humidity = document.getElementById("humidity");
const pressure = document.getElementById("pressure");
const form = document.getElementById('weatherForm');
const main = document.querySelector('main');

const apiKey = '4290241daf21ef5c6151d31435d4f5c4';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid='+apiKey;

form.addEventListener('submit', event => {
    event.preventDefault();
    if (valueSearch.value.trim() !== '') {
        searchWeather(valueSearch.value.trim());
    }
});

const searchWeather = () => {
    fetch(baseUrl+'&q='+valueSearch.value)
        .then(responsive => responsive.json())
        .then(data => {
            if (data.cod == 200) {
                city.querySelector('figcaption').innerText = data.name;
                city.querySelector('img').src = 'https://flagsapi.com/'+data.sys.country+'/shiny/32.png';
                temperature.querySelector('img').src = 'http://openweathermap.org/img/wn/'+data.weather[0].icon+'@4x.png';
                temperature.querySelector('figcaption span').textContent = Math.round(data.main.temp);
                description.textContent = data.weather[0].description;
                clouds.textContent = data.clouds.all;
                humidity.textContent = data.main.humidity;
                pressure.textContent = data.main.pressure;
            } else {
                showError();
            }
        })
        .catch(showError)
        .finally(() => {
            valueSearch.value = '';
        });
};

const showError = () => {
    main.classList.add('error');
    setTimeout(() => main.classList.remove('error'), 1000);
};

const initApp = () => {
    searchWeather("Washington");
};

initApp();
