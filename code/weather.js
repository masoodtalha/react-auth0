const fetch = require('node-fetch')

module.exports = function (event) {
  const city = event.data.city
  return fetch(getApiUrl(city))
  .then(res => res.json())
  .then(data => {
    console.log(data)
    return {
      data: {
        temperature: data.main.temp,
        pressure: data.main.pressure,
        windSpeed: data.wind.speed,
      }
    }
  })
}

function getApiUrl(query) {
	return `http://samples.openweathermap.org/data/2.5/weather?q=${query}&appid=b1b15e88fa797225412429c1c50c122a1`
  }