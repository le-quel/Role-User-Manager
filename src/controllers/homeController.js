import userServices from '../services/userServices'

var mysql2 = require('mysql2/promise');

import bluebird from "bluebird";
// var mysql2 = require('mysql2');
// hash password vs bcrypts
import bcrypts from "bcryptjs";

const salt = bcrypts.genSaltSync(10);


var conection = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "jwt_react",
    promise: bluebird,
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

const Handle_getallUser = async (req, res) => {
    try {
        let userList = await userServices.getallUser();
        // console.log(">>>check list user:", userList);
        return res.render("listUser.ejs", { userList });  // {userList} là trả nó ra theo dạng obj
    } catch (error) {
        console.error("Error in Handle_getallUser:", error);
        return res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    HandleHelloWorld,
    HandleUserPage,
    HandleCreateNewUser,
    Handle_getallUser
}