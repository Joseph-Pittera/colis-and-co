// Import necessary modules
require("dotenv").config();
const path = require("path");
const debug = require("debug")("colis:index");
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const router = require("./app/routers");
const setupSwagger = require("./app/helper/swagger");

const port = process.env.PORT || 3000;

const app = express();

// to allow only target site to connect to the backend
const allowedOrigins = ["https://colis-and-co.vercel.app"];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

// app.use(cors());

// Configure body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define route to show delivery images
app.use("/images", express.static(path.join(__dirname, "images")));

setupSwagger(app); // Setup Swagger documentation

app.use(router);

// Start the server and listen for incoming requests
app.listen(port, () => {
  debug(`Server ready: http://localhost:${port}`);
});
