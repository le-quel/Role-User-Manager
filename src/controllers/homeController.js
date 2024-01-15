import userServices from '../services/userServices'

var mysql2 = require('mysql2/promise');

import bluebird from "bluebird";
// var mysql2 = require('mysql2');
// hash password vs bcrypts
import bcrypts from "bcryptjs";

const salt = bcrypts.genSaltSync(10);


var pool = mysql2.createPool({
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

    return res.redirect("/user");
}

const Handle_getallUser = async (req, res) => {
    try {
        let userList = await userServices.getallUser();
        // await userServices.deleteUser(16);
        // console.log(">>>check list user:", userList);
        return res.render("listUser.ejs", { userList });  // {userList} là trả nó ra theo dạng obj
    } catch (error) {
        console.error("Error in Handle_getallUser:", error);
        return res.status(500).send("Internal Server Error");
    }
}

const HandleDeleteUser = async (req, res) => {
    await userServices.deleteUser(req.params.id);
    let userList = await userServices.getallUser();
    return res.render("listUser.ejs", { userList });
    // ...
}


const getUpdateUser = async (req, res) => {
    let id = req.params.id;
    let user = await userServices.getOneUser(id);
    let userData = user;
    // if (user && user.length > 0) {
    //     userData = user[0];
    //     console.log(userData);
    // }
    // console.log(">>>Check user", user);
    // console.log(">>>check userData", userData)
    return res.render("updateUser.ejs", { userData });

}

const HandleUpdateUser = async (req, res) => {
    let email = req.body.email
    let username = req.body.username
    let id = req.body.id
    await userServices.UpdateUserInfor(email, username, id)
    return res.redirect("/listUser");
}

module.exports = {
    HandleHelloWorld,
    HandleUserPage,
    HandleCreateNewUser,
    Handle_getallUser,
    HandleDeleteUser,
    getUpdateUser,
    HandleUpdateUser
}