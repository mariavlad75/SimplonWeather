// J’ai fait cette fonction pour envoyer le nom d’une ville depuis le frontend
//et récupérer quelques infos météo utiles.
// le but est de récupérer plusieurs paramètres qui seront utilisés lors de l'affichage du site

import { fetchWeatherApi } from "openmeteo";

export default async function handler(req, res) {
  try {
    const { cityInput } = req.body;

    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${cityInput}&count=1`
    );
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      return res.status(404).json({ message: "City not found" });
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    const params = {
      latitude: [latitude],
      longitude: [longitude],
      daily: [
        "sunrise",
        "sunset",
        "relative_humidity_2m_mean",
        "temperature_2m_mean",
        "apparent_temperature_mean",
        "visibility_mean",
        "wind_speed_10m_mean",
        "winddirection_10m_dominant",
      ],
      timezone: "auto",
      forecast_days: 1,
    };

    const url = "https://api.open-meteo.com/v1/forecast";

    const responses = await fetchWeatherApi(url, params);
    const response = responses[0];

    const daily = response.daily();
    const utcOffsetSeconds = response.utcOffsetSeconds();

    const sunrise = new Date(
      (Number(daily.variables(0).valuesInt64(0)) + utcOffsetSeconds) * 1000
    );

    const sunset = new Date(
      (Number(daily.variables(1).valuesInt64(0)) + utcOffsetSeconds) * 1000
    );

    const result = {
      city: name,
      country: country,
      sunrise,
      sunset,
      humidity: Math.round(daily.variables(2).valuesArray()[0]),
      temperature: daily.variables(3).valuesArray()[0],
      feelsLike: daily.variables(4).valuesArray()[0],
      visibility: daily.variables(5).valuesArray()[0],
      windSpeed: daily.variables(6).valuesArray()[0],
      windDirection: daily.variables(7).valuesArray()[0],
    };

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error fetching weather data" });
  }
}

