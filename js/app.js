
//Interação
const citySearchInput = document.getElementById('city-search-input')
const citySearchButton = document.getElementById('city-search-button')

//Exibição
const currentDate = document.getElementById('current-date')
const cityName = document.getElementById('city-name')
const weatherIcon = document.getElementById('weather-icon')
const weatherDescription = document.getElementById('weather-description')
const currentTemperature = document.getElementById('current-temperature')
const windSpeed = document.getElementById('wind-speed')
const feelsLikeTemperature = document.getElementById('feels-like-temperature')
const currentHumidity = document.getElementById('current-humidity')
const sunsetTime = document.getElementById('sunset-time')
const sunriseTime = document.getElementById('sunrise-time')

const api_key = 'b0926c4638b1d89a1e02fac5b435ab10';

//Interação nos botões
citySearchButton.addEventListener('click', () => {

  //Armazenar numa let o nome da cidade digitado pelo user
  let cityName = citySearchInput.value

  //Usar essa let pra criar uma função pra usar na requisição
  getCityWeather(cityName)
})


//Fazendo a requisição a api
//Pegar a resposta e converter em json
//Mandar esses dados para uma outra função
function getCityWeather(cityName){    
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=pt_br&appid=${api_key}`)
  .then((response) => response.json())
  .then((data) => displayWeather(data))
}


//Criar função desestruturar o objeto json
//Ficar só com os dados que forem usados
function displayWeather(data){
  let {
    dt,
    main : {temp, feels_like, humidity},
    name,
    sys : {sunrise, sunset},
    weather : [{icon, description}],
    wind : {speed}
  } = data  

  //Atribuir esses dados as variaves com os elementos no dom
  //Ajustes na formatação de exibição dos dados
  currentDate.textContent = formatDate(dt)
  cityName.textContent = name
  weatherIcon.src = `./assets/${icon}.svg`
  weatherDescription.textContent = description
  currentTemperature.textContent = `${Math.round(temp)}ºC`
  windSpeed.textContent = `${Math.round(speed * 3.6)}km/h`
  feelsLikeTemperature.textContent = `${Math.round(feels_like)}ºC`
  currentHumidity.textContent = `${humidity}%`
  sunsetTime.textContent = formatTime(sunset)
  sunriseTime.textContent = formatTime(sunrise)
}

//Humanizando o formato de data
function formatDate(epochTime){
  let date = new Date(epochTime * 1000)
  let formattedDate = date.toLocaleDateString('pt-BT', {month:"long", day:"numeric"})
  return `Hoje, ${formattedDate}`
}

//Humanizando o formato de tempo
function formatTime(epochTime){
  let date = new Date(epochTime * 1000)
  let hours = date.getHours()
  let minutes = date.getMinutes()
  return `${hours}:${minutes}`
}







