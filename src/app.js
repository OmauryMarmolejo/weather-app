const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { registerPartials } = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Omaury Marmolejo",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Omaury Marmolejo",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    content: "This is the help page",
    name: "Omaury Marmolejo",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You need to provide an address!",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/productions", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query);
  res.send({
    productions: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    content: "Help article not found",
    name: "Omaury Marmolejo",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    content: "Page not found",
    name: "Omaury Marmolejo",
  });
});

app.listen(3000, () => {
  console.log("Server is up");
});
