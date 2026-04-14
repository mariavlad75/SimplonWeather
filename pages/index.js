import { useState, useEffect } from "react";

import { MainCard } from "../components/MainCard";
import { ContentBox } from "../components/ContentBox";
import { Header } from "../components/Header";
import { DateAndTime } from "../components/DateAndTime";
import { Search } from "../components/Search";
import { MetricsBox } from "../components/MetricsBox";
import { UnitSwitch } from "../components/UnitSwitch";
import { LoadingScreen } from "../components/LoadingScreen";
import { ErrorScreen } from "../components/ErrorScreen";

import styles from "../styles/Home.module.css";

export const App = () => {
  const [cityInput, setCityInput] = useState("Paris");
  const [triggerFetch, setTriggerFetch] = useState(true);
  const [weatherData, setWeatherData] = useState();
  const [unitSystem, setUnitSystem] = useState("metric");

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("api/data", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cityInput }),
        });

        const data = await res.json();
        setWeatherData(data);
      } catch (error) {
        setWeatherData({ message: "Error fetching data" });
      }
    };

    getData();
  }, [triggerFetch]);

  const changeSystem = () =>
    unitSystem === "metric"
      ? setUnitSystem("imperial")
      : setUnitSystem("metric");

  return weatherData && !weatherData.message ? (
    <div className={styles.wrapper}>
      <MainCard
        city={weatherData.city}
        country={weatherData.country}
        description="Weather data"
        iconName="01d"
        unitSystem={unitSystem}
        weatherData={weatherData}
      />

      <ContentBox>
        <Header>
          <DateAndTime weatherData={weatherData} unitSystem={unitSystem} />

          <Search
            placeHolder="Search a city..."
            value={cityInput}
            onFocus={() => setCityInput("")}
            onChange={(e) => setCityInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && cityInput.trim() !== "") {
                setTriggerFetch(!triggerFetch);
              }
            }}
          />
        </Header>

        <MetricsBox weatherData={weatherData} unitSystem={unitSystem} />

        <UnitSwitch onClick={changeSystem} unitSystem={unitSystem} />
      </ContentBox>
    </div>
  ) : weatherData && weatherData.message ? (
    <ErrorScreen errorMessage="Error fetching weather data">
      <Search
        placeHolder="Search a city..."
        onFocus={(e) => (e.target.value = "")}
        onChange={(e) => setCityInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setTriggerFetch(!triggerFetch);
          }
        }}
      />
    </ErrorScreen>
  ) : (
    <LoadingScreen loadingMessage="Loading data..." />
  );
};

export default App;
