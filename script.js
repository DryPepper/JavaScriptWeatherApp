async function getCurrentWeatherByCity(city) {
    const data = await fetch(`http://api.weatherapi.com/v1/current.json?key=067e997619bc43b08a794907240711&q=${city}&aqi=no`)
    const currentWeather = await data.json()
    console.log(currentWeather)
    return currentWeather
}

const locationInput = document.querySelector('.location-input')
const locationButton = document.querySelector('.location-button')

locationButton.addEventListener('click', async () => {
    const locationInputValue = locationInput.value
    const currentWeather = await getCurrentWeatherByCity(locationInputValue)
    const forecast = await getForecastByCity(locationInputValue)

    const currentWeatherIcon = `http:${currentWeather.current.condition.icon}`
    const currentWeatherTemperature = currentWeather.current.temp_c
    const currentWeatherStatus = currentWeather.current.condition.text

    resetWeatherApp()
    renderCurrentWeather(currentWeatherIcon, currentWeatherTemperature, currentWeatherStatus)
    renderForecast(forecast.forecast.forecastday[0].hour)
})

function renderCurrentWeather(iconSrc, temperature, status) {
    const currentWeatherIconEL = document.createElement('img')
    currentWeatherIconEL.setAttribute('class', 'current-weather-icon')
    currentWeatherIconEL.setAttribute('src', iconSrc)

    const currentWeatherTemperatureEL = document.createElement('p')
    currentWeatherTemperatureEL.setAttribute('class', 'current-weather-temperature')
    currentWeatherTemperatureEL.innerHTML = `${temperature}°С`

    const currentWeatherStatusEL = document.createElement('p')
    currentWeatherStatusEL.setAttribute('class', 'current-weather-status')
    currentWeatherStatusEL.innerHTML = status

    const currentWeather = document.querySelector('.current-weather')
    currentWeather.appendChild(currentWeatherIconEL)
    currentWeather.appendChild(currentWeatherTemperatureEL)
    currentWeather.appendChild(currentWeatherStatusEL)
}

async function getForecastByCity(city) {
    const data = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=067e997619bc43b08a794907240711&q=${city}&days=1&aqi=no&alerts=no`)
    const forecast = await data.json()
    console.log(forecast)
    return forecast
}

function createForecastElement(iconSrc, time, temperature) {
    const forecastElement = document.createElement('div')
    forecastElement.setAttribute('class', 'forecast-element')

    const forecastTime = document.createElement('p')
    forecastTime.setAttribute('class', 'forecast-time')
    forecastTime.innerHTML = time.slice(11)

    const forecastIcon = document.createElement('img')
    forecastIcon.setAttribute('class', 'forecast-icon')
    forecastIcon.setAttribute('src', `http:${iconSrc}`)

    const forecastTemperature = document.createElement('p')
    forecastTemperature.setAttribute('class', 'forecast-temperature')
    forecastTemperature.innerHTML = `${temperature}°С`

    forecastElement.appendChild(forecastTime)
    forecastElement.appendChild(forecastIcon)
    forecastElement.appendChild(forecastTemperature)

    return forecastElement
}

function renderForecast(forecast) {
    const forecastContainer = document.querySelector(".forecast")
    forecast.forEach(forecastItem => {
        const forecastElement = createForecastElement(forecastItem.condition.icon, forecastItem.time, forecastItem.temp_c)
        forecastContainer.appendChild(forecastElement)
    })
}

function resetWeatherApp() {
    const currentWeather = document.querySelector('.current-weather')
    currentWeather.innerHTML = ''

    const forecastContainer = document.querySelector(".forecast")
    forecastContainer.innerHTML = ''
}