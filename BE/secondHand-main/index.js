const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const session = require('express-session');

const routes = require("./Routes/routes");
const connection = require('./Services/connection');

dotenv.config();

const app = express();

app.use(cors({
    origin: "http://localhost:4200",
}));

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());


app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

app.listen(process.env.PORT, () => {
    console.log("Server is running on port " + process.env.PORT);
});
