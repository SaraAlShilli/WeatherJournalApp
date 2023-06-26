// Get the current date dynamically
let currentDate = new Date().toDateString();

// Base URL for retrieving weather information from OpenWeatherMap API (country: US)
const weatherAPIBaseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";

// API key and units parameter for Celsius temperature
const apiKey = "&appid=2506e62b604cd264ef103a0bff33cb5b&units=metric";

// Server URL for posting data
const serverURL = "http://127.0.0.1:4000";

// Element to display error messages
const errorElement = document.getElementById("error");

// Function to generate and process data
const generateData = () => {
  const zipCode = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;

  getWeatherData(zipCode)
    .then((weatherData) => {
      if (weatherData) {
        const { main: { temp }, name: city, weather: [{ description }] } = weatherData;

        const data = {
          date: currentDate,
          city,
          temperature: Math.round(temp),
          description,
          feelings,
        };

        postData(serverURL + "/add", data);
        updateUI();
        document.getElementById("entry").style.opacity = 1;
      }
    });
};

// Add event listener to the button
document.getElementById("generate").addEventListener("click", generateData);

// Function to fetch weather data from API
const getWeatherData = async (zipCode) => {
  try {
    const response = await fetch(weatherAPIBaseURL + zipCode + apiKey);
    const weatherData = await response.json();

    if (weatherData.cod !== 200) {
      errorElement.innerHTML = weatherData.message;
      setTimeout(() => errorElement.innerHTML = "", 2000);
      throw `${weatherData.message}`;
    }

    return weatherData;
  } catch (error) {
    console.log(error);
  }
};

// Function to post data to the server
const postData = async (url = "", data = {}) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const responseData = await response.json();
    console.log("Data saved:", responseData);
    return responseData;
  } catch (error) {
    console.log(error);
  }
};

// Function to update the UI with project data
const updateUI = async () => {
  try {
    const response = await fetch(serverURL + "/all");
    const projectData = await response.json();

    document.getElementById("date").innerHTML = projectData.date;
    document.getElementById("city").innerHTML = projectData.city;
    document.getElementById("temp").innerHTML = projectData.temperature + "&deg;C";
    document.getElementById("description").innerHTML = projectData.description;
    document.getElementById("content").innerHTML = projectData.feelings;
  } catch (error) {
    console.log(error);s
  }
};
