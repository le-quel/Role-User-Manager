import db from "../models/index";
import bcrypt from "bcryptjs";
const saltRounds = 10;
import { Op } from 'sequelize';

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
            };
        }

        let isPhoneExist = await checkPhoneExist(rawUserData.phone)
        if (isPhoneExist === true) {
            return {
                EM: "The phone is already exist",
                EC: 1
            };
        }

        // hash password
        let hashedPassword = hashUserPassword(rawUserData.password);
        await db.Users.create({
            email: rawUserData.email,
            phone: rawUserData.phone,
            username: rawUserData.username,
            password: hashedPassword  // Use the hashed password here
        });

        return {
            EM: "A user created is successfully!",
            EC: 0
        };
    } catch (error) {
        console.log(error);
        return {
            EM: "Something wrong is services in...",
            EC: 2
        };
    }
};

const checkPassword = (inputPassword, hashPassword) => {
    console.log("Input Password:", inputPassword);
    console.log("Hashed Password:", hashPassword);
    return bcrypt.compareSync(inputPassword, hashPassword)

}
const handleUserLogin = async (rawData) => {
    try {
        let user = await db.Users.findOne({
            where: {
                [Op.or]: [
                    { email: rawData.valueLogin },
                    { phone: rawData.valueLogin }
                ]
            }
        });

        if (user) {
            console.log("Found user, proceeding to check password");
            let isCorrectPassword = checkPassword(rawData.password, user.password);
            console.log("Password comparison result:", isCorrectPassword);

            if (isCorrectPassword) {
                return {
                    EM: "Login successful",
                    EC: 0,
                    DT: "ok"
                };
            } else {
                console.log("Incorrect password, returning error", rawData.valueLogin);
                return {
                    EM: "Your email or phone number or password is incorrect",
                    EC: 1,
                    DT: "not found email or phone or pass"
                };
            }
        } else {
            console.log("User not found with email/phone", rawData.valueLogin);
            return {
                EM: "Your email or phone number or password is incorrect",
                EC: 1,
                DT: "not found email or phone or pass"
            };
        }
    } catch (error) {
        console.log(error);
        return {
            EM: "Something wrong in services...",
            EC: 2,
            DT: "failed"
        };
    }
};

module.exports = {
    registerNewUser,
    checkEmailExist,
    checkPhoneExist,
    hashUserPassword,
    handleUserLogin
}