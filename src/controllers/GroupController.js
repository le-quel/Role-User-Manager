// File: controllers/GroupController.js
import groupServices from "../services/groupServices";

const readFunc = async (req, res) => {
    try {
        let data = await groupServices.getGroup();

        console.log(">>>check data controller", data);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        });
    } catch (error) {
        console.error('Sequelize error from controller:', error);
        return res.status(500).json({
            EM: 'Error',
            EC: '1',
            DT: []
        });
    }
};

module.exports = {
    readFunc
};
