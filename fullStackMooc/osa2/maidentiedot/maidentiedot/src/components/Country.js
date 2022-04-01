import React, { useEffect, useState } from "react";
import axios from "axios";

const Country = props => {
  const { name, capital, population, languages, flag } = props.country;
  const [weather, setWeather] = useState({});

  const flagStyle = {
    width: "30%",
    height: "auto"
  };

  useEffect(() => {
    const request = `http://api.weatherstack.com/current?access_key=44bcd952fffabef8562210311d27c879&query=${capital}`;
    axios.get(request).then(response => {
      setWeather(response.data.current);
    });
  }, [capital]);

  return (
    <>
      <h1>{name}</h1>
      <p>Capital {capital}</p>
      <p>Population {population}</p>
      <h2>Languages</h2>
      <ul>
        {languages.map(language => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img src={flag} style={flagStyle} alt={name} />
      {weather !== undefined ? (
        <div>
          <h2>Weather in {capital}</h2>
          <h3>temperature: {weather.temperature}</h3>
          <img src={weather.weather_icons} alt={"current weather"}></img>
          <h3>
            wind: {weather.wind_speed} kph direction {weather.wind_dir}
          </h3>
        </div>
      ) : (
        <h2>Weather data not available</h2>
      )}
    </>
  );
};

export default Country;
