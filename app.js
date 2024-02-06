const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const advertsRouter = require("./routes/adverts");

const app = express();
const formatLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatLogger));
app.use(cors());
app.use(express.json());
app.use("/adverts", advertsRouter);

app.use("api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;

// {
//         "id": 4616,
//         "year": 2008,
//         "make": "",
//         "model": "",
//         "type": "",
//         "img": "",
//         "description": "",
//         "fuelConsumption": "",
//         "engineSize": "",
//         "accessories": [],
//         "functionalities": [],
//         "rentalPrice": 250,
//         "rentalCompany": "",
//         "address": "",
//         "rentalConditions": "Minimum age: 30\nValid driver's license\nSecurity deposit and insurance required",
//         "mileage": 6464
//     },
