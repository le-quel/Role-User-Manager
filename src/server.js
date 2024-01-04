import express from "express";
import configViewEngine from "./configs/ViewEngine";
import initWebRoutes from "./routers/web";
import bodyParser from "body-parser";

require("dotenv").config();
const app = express();
//config bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//config view engine
configViewEngine(app);

//init web routes
initWebRoutes(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log("Chạy ngon ơ luôn nè mấy ní trên cái port " + PORT)
})