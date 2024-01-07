var mysql2 = require('mysql2/promise');
import bcrypt from "bcryptjs";

const sequelize = require("sequelize");
import bluebird from "bluebird";
// var conection = mysql2.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "jwt_react",
//     promise: bluebird,
// });
const salt = bcrypt.genSaltSync(10);


const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const CreateNewUser = async (email, password, username, res) => {
    const pool = await mysql2.createPool({
        host: "localhost",
        user: "root",
        password: "",
        database: "jwt_react",
        promise: bluebird,
    });
    let hashPass = hashUserPassword(password);
    console.log(">>> Check hashpassword:", hashPass);

    let check = bcrypt.compareSync(password, hashPass); // băm ngược
    console.log(">>> Check password:", check);

    const [rows, fields] = await pool.execute('INSERT INTO users (email, password, username) VALUES (?, ?, ?)', [email, hashPass, username]);
    // console.log(">>> check rows: ", rows);
    return rows;
}


const getallUser = async () => {
    const pool = await mysql2.createPool({
        host: "localhost",
        user: "root",
        password: "",
        database: "jwt_react",
        promise: bluebird,
    });

    try {
        // Now, 'connection' is defined and can be used in your queries
        const [rows, fields] = await pool.execute('SELECT * FROM users');
        // console.log(">>> check rows: ", rows);

        // Close the connection after executing the query
        return rows;
    } catch (error) {
        console.error(">>>check err:", error);
        throw error; // Rethrow the error to be caught by the calling function
    }
};

const deleteUser = async (id) => {
    // DELETE FROM user WHERE id=?;
    if (!id) {
        throw new Error("Invalid id provided");
    }
    const pool = await mysql2.createPool({
        host: "localhost",
        user: "root",
        password: "",
        database: "jwt_react",
        promise: bluebird,
    });
    const [rows, fields] = await pool.execute('DELETE FROM users WHERE id=?', [id]);
    // console.log(">>> check rows: ", rows);
    return rows;

}
const getOneUser = async (id) => {
    const pool = await mysql2.createPool({
        host: "localhost",
        user: "root",
        password: "",
        database: "jwt_react",
        promise: bluebird,
    });
    const [rows, fields] = await pool.execute('select * FROM users WHERE id=?', [id]);
    // console.log(">>> check rows: ", rows);
    return rows;

}

const UpdateUserInfor = async (email, username, id) => {
    const pool = await mysql2.createPool({
        host: "localhost",
        user: "root",
        password: "",
        database: "jwt_react",
        promise: bluebird,
    });
    const [rows, fields] = await pool.execute('Update  users SET email=?, username=? WHERE id=?', [email, username, id]);
    // console.log(">>> check rows: ", rows);
    return rows;
}
module.exports = {
    hashUserPassword,
    CreateNewUser,
    getallUser,
    deleteUser,
    getOneUser,
    UpdateUserInfor
};
