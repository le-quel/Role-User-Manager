import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routers/web";
import bodyParser from "body-parser";
import cors from 'cors';
import connecttion from "./config/connectDB";
require("dotenv").config();
const app = express();
//config bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//config api 
app.use(cors());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', process.env.REACT_URL);
    res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Request-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
//config view engine
configViewEngine(app);

// test connectdb

//init web routes
initWebRoutes(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log("Chạy ngon ơ luôn nè mấy ní trên cái port " + PORT)
})