// Require the Express module to run the server and handle routes
const express = require("express");

// Create an instance of the Express app
const app = express();

// Enable Cross-Origin Resource Sharing (CORS) to allow communication between the front-end and the server
const cors = require("cors");
app.use(cors());

// Use the body-parser middleware to parse incoming JSON data in POST route handlers
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Create an empty JavaScript object to serve as the endpoint for all routes
let projectData = {};

// Set up the main project folder to serve static files
app.use(express.static("website"));

// Define the callback function for the GET '/all' route
const getAllData = (req, res) => {
  res.status(200).send(projectData);
};

app.get("/all", getAllData);

// Define the callback function for the POST '/add' route
const addData = (req, res) => {
  projectData = req.body;
  console.log(projectData);
  res.status(200).send(projectData);
};

app.post("/add", addData);

// Set the port and hostname
const port = 4000;
const hostname = "127.0.0.1";

// Define the callback function to log that the server is running
const serverListening = () =>
  console.log(`Server running at http://${hostname}:${port}/`);

// Start the server
app.listen(port, serverListening);
