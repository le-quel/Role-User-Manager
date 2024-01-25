import db from "../models/index";

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
            limit: limit
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
        console.error('Sequelize error:', error);
        return {
            EM: 'Sequelize error',
            EC: '1',
            DT: []
        };
    }
};

const createNewUser = () => {

}

const updateUser = () => {

}

const deleteUser = () => {

}

module.exports = {
    getAllUser, createNewUser, updateUser, deleteUser, getUserWithPagination
}