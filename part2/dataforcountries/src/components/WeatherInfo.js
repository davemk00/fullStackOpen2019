import React, { useEffect, useState } from 'react'
import axios from 'axios'

const baseURL = 'http://api.weatherstack.com/'
const apikey = process.env.REACT_APP_API_KEY

const WeatherInfo = ({country}) => {
  const [weather, setWeather] = useState([])
  
  const hook = () => {
    axios
      .get(`${baseURL}/current?access_key=${apikey}&query=${country.capital}`)
      .then(response => {
          setWeather(response.data.current)
        }
      )
  }
  
  useEffect(hook, [])

  return (
    <div>
      <h2>Weather in {country.capital}</h2>
      <div>
        <span><b>Temperature:</b> {weather.temperature} °C</span><br />
        <img src={weather.weather_icons} alt='weatherImage'/> <br />
        <span><b>Wind:</b> {weather.wind_speed} km/h, {weather.wind_dir}</span>
      </div>
    </div>
  )
}

export default WeatherInfo