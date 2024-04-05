// File: services/groupServices.js
import db from "../models/index";

const getGroup = async () => {

    try {
        let data = await db.Group.findAll({
            order: [['name', 'ASC']]
        });
        return {
            EM: 'Success',
            EC: '0',
            DT: data
        }
        // if (data) {
        //     console.log(data);


        // } else {
        //     return {
        //         EM: 'fall data',
        //         EC: '1',
        //         DT: []
        //     }
        // }
    } catch (error) {
        console.error('Sequelize error from services:', error);
        return {
            EM: 'error',
            EC: '1',
            DT: []
        };
    }
};

module.exports = {
    getGroup
};
