import userServices from '../services/userServices'


var mysql = require('mysql');
// hash password vs bcrypts
import bcrypts from "bcryptjs";

const salt = bcrypts.genSaltSync(10);


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "jwt_react"
});

const HandleHelloWorld = (req, res) => {
    const name = "homecontroller";
    return res.render("home.ejs", { name });
}

const HandleUserPage = (req, res) => {
    return res.render("user.ejs");
}


const HandleCreateNewUser = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;
    let hashPassword = bcrypts.hashSync(password, salt);

    // Pass the hashed password to userServices.CreateNewUser
    userServices.CreateNewUser(email, hashPassword, username);

    return res.send("handlecreatenewuser");
}

const Handle_getallUser = (req, res) => {
    userServices.getallUser();
    return res.send("gọi tăt cả user")
}

module.exports = {
    HandleHelloWorld,
    HandleUserPage,
    HandleCreateNewUser,
    Handle_getallUser
}