var mysql2 = require('mysql2/promise');
import bcrypt from "bcryptjs";

import bluebird from "bluebird";
var conection = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "jwt_react",
    promise: bluebird,
});
const salt = bcrypt.genSaltSync(10);


const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const CreateNewUser = (email, password, username, res) => {
    let hashPass = hashUserPassword(password);
    console.log(">>> Check hashpassword:", hashPass);

    let check = bcrypt.compareSync(password, hashPass); // băm ngược
    console.log(">>> Check password:", check);

    conection.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "INSERT INTO user (email, password, username) VALUES (?, ?, ?)";
        conection.query(sql, [email, hashPass, username], function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
    });

    // Do not use return res.send outside of a route handler
    // You should handle the response within the route handler where CreateNewUser is called
}

const getallUser = async () => {
    try {
        var connection = await mysql2.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "jwt_react",
            promise: bluebird,
        });

        // Now, 'connection' is defined and can be used in your queries
        const [rows, fields] = await connection.execute('SELECT * FROM user');
        console.log(">>> check rows: ", rows);

        // Close the connection after executing the query
        await connection.end();

        return rows;
    } catch (error) {
        console.error(">>>check err:", error);
        throw error; // Rethrow the error to be caught by the calling function
    }
};


module.exports = {
    hashUserPassword,
    CreateNewUser,
    getallUser
};
