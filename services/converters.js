export const ctoF = (c) => (c * 9) / 5 + 32;

export const mpsToMph = (mps) => (mps * 2.236936).toFixed(2);

export const kmToMiles = (km) => (km / 1.609).toFixed(1);

export const degToCompass = (num) => {
  const val = Math.round(num / 22.5);
  const arr = [
    "N",
    "NNE", 
    "NE", 
    "ENE",
    "E", 
    "ESE", 
    "SE", 
    "SSE",
    "S", 
    "SSW", 
    "SW", 
    "WSW",
    "W", 
    "WNW", 
    "NW", 
    "NNW",
  ];
  return arr[val % 16];
};
