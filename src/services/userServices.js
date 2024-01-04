var mysql = require('mysql');
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "jwt_react"
});

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const CreateNewUser = (email, password, username, res) => {
    let hashPass = hashUserPassword(password);
    console.log(">>> Check hashpassword:", hashPass);

    let check = bcrypt.compareSync(password, hashPass); // băm ngược
    console.log(">>> Check password:", check);

    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "INSERT INTO user (email, password, username) VALUES (?, ?, ?)";
        con.query(sql, [email, hashPass, username], function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
    });

    // Do not use return res.send outside of a route handler
    // You should handle the response within the route handler where CreateNewUser is called
}

const getallUser = () => {
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "Select * from user ";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
    });

}
module.exports = {
    CreateNewUser,
    getallUser
};
