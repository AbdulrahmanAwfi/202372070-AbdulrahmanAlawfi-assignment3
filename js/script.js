

let date = new Date();
alert("Welcome to my portfolio! You are viewing this page on\n" + date.getHours() + ":" + date.getMinutes() + ", on the " + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + ".\nI hope you enjoy your visit!");


function showSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}


document.body.dataset.theme = localStorage.getItem("theme") || "light";
function toggleTheme() {
    if(localStorage.getItem("theme") !== null) {
    const theme = localStorage.getItem("theme") || "light";
    const newTheme = theme === "light" ? "dark" : "light";
    document.body.dataset.theme = newTheme;
    localStorage.setItem("theme", newTheme);
}
    else {
        alert("Error: failed to retrieve theme from localStorage, refresh the page."); //task 5, error ahndling and user feedback is done here
    }
}

const weatherElement = document.querySelector("#weatherDescription");

const weatherDescriptions = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Fog",
  51: "Drizzle",
  53: "Drizzle",
  55: "Drizzle",
  61: "Rain",
  63: "Rain",
  65: "Heavy rain",
  80: "Rain showers",
  81: "Rain showers",
  82: "Heavy rain showers",
  95: "Thunderstorm",
};

async function loadWeather() {
  const params = new URLSearchParams({
    latitude: "24.4686",
    longitude: "39.6142",
    current:
      "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m",
    temperature_unit: "celsius",
    wind_speed_unit: "kmh",
    timezone: "Asia/Riyadh",
  });

  const url = `https://api.open-meteo.com/v1/forecast?${params}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const data = await response.json();
    const current = data.current;
    const description =
      weatherDescriptions[current.weather_code] ?? "Current conditions";

    weatherElement.textContent =
      `${description}. ${current.temperature_2m} °C, ` +
      `feels like ${current.apparent_temperature} °C. ` +
      `Humidity: ${current.relative_humidity_2m}%. ` +
      `Wind: ${current.wind_speed_10m} km/h.`;
  } catch (error) {
    console.error("Could not load the weather:", error);
    weatherElement.textContent = "Weather could not be loaded.";
  }
}
