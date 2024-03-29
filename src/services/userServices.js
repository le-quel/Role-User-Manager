var mysql2 = require('mysql2/promise');
import bcrypt from "bcryptjs";
import db from "../models/index"
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

    let hashPass = hashUserPassword(password);
    console.log(">>> Check hashpassword:", hashPass);

    let check = bcrypt.compareSync(password, hashPass); // băm ngược
    console.log(">>> Check password:", check);
    await db.Users.create({
        email: email,
        password: hashPass,
        username: username,


    })

    // const [rows, fields] = await pool.execute('INSERT INTO user (email, password, username) VALUES (?, ?, ?)', [email, hashPass, username]);
    // // console.log(">>> check rows: ", rows);
    // return rows;
}


const getallUser = async () => {
    let users = []
    users = await db.Users.findAll()
    return users;
    // const pool = await mysql2.createPool({
    //     host: "localhost",
    //     user: "root",
    //     password: "",
    //     database: "jwt_react",
    //     promise: bluebird,
    // });

    // try {
    //     // Now, 'connection' is defined and can be used in your queries
    //     // const [rows, fields] = await pool.execute('SELECT * FROM user');
    //     // console.log(">>> check rows: ", rows);

    //     // Close the connection after executing the query
    //     // return rows;
    // } catch (error) {
    //     console.error(">>>check err:", error);
    //     throw error; // Rethrow the error to be caught by the calling function
    // }
};

const deleteUser = async (id) => {
    // DELETE FROM user WHERE id=?;
    await db.Users.destroy({
        where: {
            id: id
        }
    });

    // if (!id) {
    //     throw new Error("Invalid id provided");
    // }
    // const pool = await mysql2.createPool({
    //     host: "localhost",
    //     user: "root",
    //     password: "",
    //     database: "jwt_react",
    //     promise: bluebird,
    // });
    // const [rows, fields] = await pool.execute('DELETE FROM user WHERE id=?', [id]);
    // // console.log(">>> check rows: ", rows);
    // return rows;

}
const getOneUser = async (id) => {
    // const pool = await mysql2.createPool({
    //     host: "localhost",
    //     user: "root",
    //     password: "",
    //     database: "jwt_react",
    //     promise: bluebird,
    // });
    // const [rows, fields] = await pool.execute('select * FROM user WHERE id=?', [id]);
    // // console.log(">>> check rows: ", rows);
    // return rows;
    let userOne = {}
    userOne = await db.Users.findOne({
        where: { id: id },
        raw: true
    });
    // console.log(">>check user id one:", userOne)
    return userOne


}

const UpdateUserInfor = async (email, username, id) => {
    await db.Users.update(
        { email: email, username: username },
        {
            where: { id: id }
        }
    )
    // const pool = await mysql2.createPool({
    //     host: "localhost",
    //     user: "root",
    //     password: "",
    //     database: "jwt_react",
    //     promise: bluebird,
    // });
    // const [rows, fields] = await pool.execute('Update  user SET email=?, username=? WHERE id=?', [email, username, id]);
    // // console.log(">>> check rows: ", rows);
    // return rows;
}
module.exports = {
    hashUserPassword,
    CreateNewUser,
    getallUser,
    deleteUser,
    getOneUser,
    UpdateUserInfor
};
