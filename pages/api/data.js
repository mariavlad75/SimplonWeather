// export default async function handler(req, res) {
//   const { cityInput } = req.body;
//   const getWeatherData = await fetch(
//     `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`
//   );
//   const data = await getWeatherData.json();
//   res.status(200).json(data);
// }
import { fetchWeatherApi } from "openmeteo";

export default async function handler(req, res) {

  const { cityInput } = req.body;
  const params = {
	latitude: [48.8534],
	longitude: [2.3488],
	daily: ["sunrise", "sunset", "relative_humidity_2m_mean", "temperature_2m_mean", "apparent_temperature_mean", "visibility_mean", "wind_speed_10m_mean", "winddirection_10m_dominant"],
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
    sunrise,
    sunset,
    humidity: daily.variables(2).valuesArray()[0],
    temperature: daily.variables(3).valuesArray()[0],
    feelsLike: daily.variables(4).valuesArray()[0],
    visibility: daily.variables(5).valuesArray()[0],
    windSpeed: daily.variables(6).valuesArray()[0],
    windDirection: daily.variables(7).valuesArray()[0],
  };
  res.status(200).json(result);
}
