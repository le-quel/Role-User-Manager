import db from "../models/index";
import { checkEmailExist, checkPhoneExist, hashUserPassword } from './loginRegisterServices';
const getAllUser = async () => {
    let data = {
        EC: '',
        EM: '',
        DT: ''
    }
    try {
        let users = await db.Users.findAll()
        if (users) {
            console.log(users);
            // let data = users.get({ plain: true })
            return {
                EM: 'Success',
                EC: '0',
                DT: users
            }
        } else {
            return {
                EM: 'fall data',
                EC: '1',
                DT: []
            }
        }

    } catch (error) {

    }
}

const getUserWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;
        const { count, rows } = await db.Users.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: ['id', 'username', 'phone', 'sex', 'email', 'address'],
            include: { model: db.Group, attributes: ["name", "description", "id"] },
            order: [['id', 'DESC']]
        });

        let totalPages = Math.ceil(count / limit);
        let data = {
            totalRows: count,
            totalPages: totalPages,
            users: rows
        };

        console.log(">>>check data", data);
        return {
            EM: 'Success',
            EC: '0',
            DT: data
        };
    } catch (error) {
        console.error('Sequelize error from services:', error);
        return {
            EM: 'Sequelize error',
            EC: '1',
            DT: []
        };
    }
};

const createNewUser = async (data) => {
    try {

        let isEmailExist = await checkEmailExist(data.email)
        if (isEmailExist === true) {
            return {
                EM: "The email is already exist",
                EC: 1,
                DT: 'email'
            };
        }

        let isPhoneExist = await checkPhoneExist(data.phone)
        if (isPhoneExist === true) {
            return {
                EM: "The phone is already exist",
                EC: 1,
                DT: 'phone'
            };
        }

        // hash password
        let hashedPassword = hashUserPassword(data.password);
        const newUser = await db.Users.create({ ...data, password: hashedPassword });

        // Trả về thông tin người dùng mới nếu thành công
        return {
            EM: 'Success',
            EC: '0',
            DT: []
        };
    } catch (error) {

        console.log(error);
        return {
            EM: 'Error creating user',
            EC: '1',
            DT: []
        };
    }
}


const updateUser = async (data) => {
    try {
        if (!data.groupId) {
            return {
                EM: "Error with group id",
                EC: 1,
                DT: "group id userapi service updateuser"
            }
        }
        let user = await db.Users.findOne({
            where: { id: data.id }
        })
        console.log("check user data ne:", data);

        if (user) {
            // update
            await user.update({
                email: data.email,
                address: data.address,
                sex: data.sex,
                groupId: data.groupId
            });
            console.log("check user ne: ", user);
            return {

                EM: "Update user success",
                EC: 0,
                DT: "ok"
            }
        } else {
            return {
                EM: "User not found",
                EC: 2,
                DT: "user api services updateuser"
            }
        }
    } catch (e) {
        console.log(e);
        return {
            EM: "error catch user api services updateuser",
            EC: 1,
            DT: []
        }
    }
}


const deleteUser = async (id) => {
    let user = await db.Users.findOne({
        where: { id: id }
    });
    if (user) {
        await db.Users.destroy({
            where: { id: id }
        });
        console.log(">>>check data", user);
        return {
            EM: 'Success',
            EC: '0',
            DT: user
        };
    } else {
        return {
            EM: 'delete Sequelize error',
            EC: '1',
            DT: []
        };
    }
};
module.exports = {
    getAllUser, createNewUser, updateUser, deleteUser, getUserWithPagination
}