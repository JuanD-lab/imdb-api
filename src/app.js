const express = require('express');
const app = express();
const logger = require("morgan");
const fs = require('fs');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('../swagger.json');
const cors = require('cors')

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

//Routes
const actorsRoutes = require('./routes/actors.routes');
const directorsRoutes = require('./routes/directors.routes');

//Middleware
app.use(cors());
app.get("/", (req, res) => res.json({"imdb-api": "1.0.0"}))
app.use(express.json())

app.use("/api/v1/", actorsRoutes)
app.use("/api/v1/", directorsRoutes)

//Error handler
app.use((err, req, res, next) => {
    console.log(err.message);
    res.status(500).send('Ups tenemos un problema en el servidor, intentalo más tarde!');
});

module.exports = app;