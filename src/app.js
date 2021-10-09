require("dotenv").config();
const express = require("express");
const app = express();
const fs = require("fs");
const logger = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("../swagger.json");
const cors = require("cors");
const helmet = require("helmet");
const multer = require("multer");
const createStorage = require("./helpers/multer");
const { sendEmail, emailOptions } = require("./helpers/nodemailer");

//Upload Images
const storage = createStorage("./uploads");
const upload = multer({ storage: storage });

//Routes
const actorsRoutes = require("./routes/actors.routes");
const moviesRoutes = require("./routes/movies.routes");
const directorsRoutes = require("./routes/directors.routes");
const usersRoutes = require("./routes/users.routes");
const loggin = require("./routes/login.routes");

//Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(
    //access logs
    logger("combined", {
        stream: fs.createWriteStream("access.log", { flags: "a" }),
    })
);
app.set("views", "/src/views/");

/* Public routes */
app.get("/", (req, res) => res.json({ "imdb-api": "1.0.1" }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.post("/api/v1/gallery", upload.single("image"), (req, res) => {
    try {
        res.send(req.file);
    } catch (err) {
        res.status(400).json({ message: error.message });
    }
});
app.use("/", loggin);
//mailing for reset pass
app.post("/api/v1/reset-password", (req, res) => {
        emailOptions.subject = "Reset password";
        emailOptions["template"] = "email";
        emailOptions["context"] = { title: "Restore password" };
        sendEmail(emailOptions);
    
    res.status(200).json("Correo enviado");
});

/* Protected routes */
app.use("/api/v1/", actorsRoutes);
app.use("/api/v1/", directorsRoutes);
app.use("/api/v1/", moviesRoutes);
app.use("/api/v1/", usersRoutes);

//Error handler
app.use((err, req, res, next) => {
    console.log(err.message);
    if (err.name === "SequelizeValidationError") {
        const errObj = {};
        err.errors.map((er) => {
            errObj[er.path] = er.message;
        });
        return res.status(400).send(errObj);
    }
    return res
        .status(500)
        .send("Ups tenemos un problema en el servidor, intentalo más tarde!");
});

module.exports = app;
