import './styles.css';
import gif from './gifsmodule';

const giphyKey = 'J5Cs2U1Luf9csXF6Ev0rlMXAwiLz8AG3';
const apiKey = 'b372304147dcddbc25a7d4c0c4bb8a8b';
const submit = document.getElementById('submit');
const weatherDiv = document.getElementById('weather-report');

async function requestData(place, key) {
  await
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place}&units=imperial&appid=${key}`, {
    mode: 'cors',
  })
    .then((response) => response.json())
    .then((data) => {
      weatherDiv.textContent = `Temperature: ${data.main.temp} F, humidity: ${data.main.humidity}, Feels Like: ${data.main.feels_like} Windspeed: ${data.wind.speed}mph, Sky: ${data.weather[0].description}`
      let gifId = '';
      if (data.main.temp > 80) {
        gifId = '3oKHWgvSdGuvZfMktq';
      } if (data.main.temp < 40) {
        gifId = '3o7ZeCHGCq8vJgj4GY';
      } if (data.main.temp > 40 && data.main.temp < 80) {
        gifId = 'snr51Qmnalxok';
      }
      fetch(`https://api.giphy.com/v1/gifs/${gifId}?api_key=${giphyKey}`, {
        mode: 'cors',
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const gif = new Image();
          gif.src = data.data.images.original.url;
          weatherDiv.appendChild(gif);
        });
    });
}

submit.addEventListener('click', () => {
  const location = document.getElementById('location');
  requestData(location.value, apiKey);
});
