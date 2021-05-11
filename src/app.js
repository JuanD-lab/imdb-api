const express = require('express');
const app = express();

//Routes
const actorsRoutes = require('./routes/actors.routes');
const directorsRoutes = require('./routes/directors.routes');

app.get("/", (req, res) => res.json({"imdb-api": "1.0.0"}))

module.exports = app;