import db from "../models/index";
import bcrypt from "bcryptjs";
const saltRounds = 10;

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, saltRounds);
    return hashPassword;
}
const checkEmailExist = async (userEmail) => {
    let isExist = await db.Users.findOne({
        where: { email: userEmail }
    })
    if (isExist) {
        return true;
    }
    return false;
}


const checkPhoneExist = async (userPhone) => {
    let isExist = await db.Users.findOne({
        where: { phone: userPhone }
    })
    if (isExist) {
        return true;
    }
    return false;
}

const registerNewUser = async (rawUserData) => {
    // check email user exist
    try {
        let isEmailExist = await checkEmailExist(rawUserData.email)
        if (isEmailExist === true) {
            return {
                EM: "The email is already exist",
                EC: 1
            }

        }
        let isPhoneExist = await checkPhoneExist(rawUserData.phone)
        if (isPhoneExist === true) {
            return {
                EM: "The phone is already exist",
                EC: 1
            }

        }
        // hasspassword
        let hasspassword = hashUserPassword(rawUserData.password)
        await db.Users.create({
            email: rawUserData.email,
            phone: rawUserData.phone,
            username: rawUserData.username,
            password: rawUserData.password
        })
        return {
            EM: "A user created is succesfully!",
            EC: 0
        }

    } catch (error) {
        console.log(error);
        return {
            EM: "Something wrong is services in...",
            EC: 2
        }

    }

}
module.exports = {
    registerNewUser,
    checkEmailExist,
    checkPhoneExist,
    hashUserPassword
}