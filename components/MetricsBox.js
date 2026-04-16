// ce fichier a pour but d'afficher les différentes informations qui seront présenter lors du lancement
// du site, on y retrouvera donc les infos suivantes : 
// - Humidité
// - Vitesse du vent 
// - La visibilité
// - Levé du soleil
// - Couché du soleil
import { degToCompass } from "../services/converters";
import {
  getTime,
  getAMPM,
  getVisibility,
  getWindSpeed,
} from "../services/helpers";
import { MetricsCard } from "./MetricsCard";
import styles from "./MetricsBox.module.css";

export const MetricsBox = ({ weatherData, unitSystem }) => {
  return (
    <div className={styles.wrapper}>
      <MetricsCard
        title={"Humidity"}
        iconSrc={"/icons/humidity.png"}
        metric={Math.round(weatherData.humidity)}
        unit={"%"}
      />

      <MetricsCard
        title={"Wind speed"}
        iconSrc={"/icons/wind.png"}
        metric={getWindSpeed(unitSystem, Math.round(weatherData.windSpeed))}
        unit={unitSystem === "metric" ? "m/s" : "mph"}
      />

      <MetricsCard
        title={"Wind direction"}
        iconSrc={"/icons/compass.png"}
        metric={degToCompass(weatherData.windDirection)}
      />

      <MetricsCard
        title={"Visibility"}
        iconSrc={"/icons/binocular.png"}
        metric={getVisibility(unitSystem, weatherData.visibility)}
        unit={unitSystem === "metric" ? "km" : "miles"}
      />

      <MetricsCard
        title={"Sunrise"}
        iconSrc={"/icons/sunrise.png"}
        metric={getTime(unitSystem, new Date(weatherData.sunrise))}
        unit={getAMPM(unitSystem, new Date(weatherData.sunrise))}
      />

      <MetricsCard
        title={"Sunset"}
        iconSrc={"/icons/sunset.png"}
        metric={getTime(unitSystem, new Date(weatherData.sunset))}
        unit={getAMPM(unitSystem, new Date(weatherData.sunset))}
      />
    </div>
  );
};
