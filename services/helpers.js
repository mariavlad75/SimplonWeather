import {
  kmToMiles,
  mpsToMph,
} from "./converters";

export const getWindSpeed = (unitSystem, windInMps) =>
  unitSystem === "metric" ? windInMps : mpsToMph(windInMps);

export const getVisibility = (unitSystem, visibilityInKm) =>
  unitSystem === "metric"
    ? visibilityInKm.toFixed(1)
    : kmToMiles(visibilityInKm);

export const getTime = (unitSystem, date) => {
  const d = new Date(date);

  if (unitSystem === "metric") {
    return d.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  let hours = d.getHours();
  const minutes = d.getMinutes().toString().padStart(2, "0");

  return `${hours % 12 || 12}:${minutes}`;
};

export const getAMPM = (unitSystem, date) => {
  if (unitSystem !== "imperial" || !date) return "";

  const hours = date.getHours();
  return hours >= 12 ? "PM" : "AM";
};

export const getWeekDay = () => {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return weekday[new Date().getDay()];
};
