// constants
const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?q=';
const FORECAST_URL = 'http://api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API KEY}';
const API_KEY = 'c66a40b4572928a3b35b539186630290';

const $main = $('main');
const $form = $('form');
const $input = $('input[type="text"]')
// state

// cached element references

// event listeners
$form.on('submit', handleSubmit);

// functions

handleSubmit();

function handleSubmit(event) {
    event && event.preventDefault();

    const location = $input.val() || 'Beijing';

    $input.focus();
    
    if(!location) return;
    
    const promise = $.ajax(`${WEATHER_URL}${location}&units=imperial&appid=${API_KEY}`);
    
    promise.then(
      (data) => {
        console.log(data);
        render(data);
    },
    (error) => {
        console.log('bad request: ', error);
    }
    );
    
    $input.val('');
}

function render(weatherData) {
    $main.html(`
    <h3>Weather for: ${weatherData.name}</h3>
    <p>Temperature: ${~~weatherData.main.temp} &#x2109</p>
    <p>Feels like: ${~~weatherData.main.feels_like} &#x2109</p>
    <p>Weather: ${weatherData.weather[0].description}</p>
    `)
};