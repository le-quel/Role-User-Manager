import userApiServices from "../services/userApiServices";

const readFunc = async (req, res) => {

    try {
        if (req.query.page && req.query.limit) {
            let page = req.query.page;
            let limit = req.query.limit
            console.log(">>>check page = ", page, ">>check limit = ", limit)
            let data = await userApiServices.getUserWithPagination(+page, +limit); // Corrected line
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT,
                data: 'success!'
            });
        }

        // let data = await userApiServices.getAllUser(); // Corrected line
        // return res.status(200).json({
        //     EM: data.EM,
        //     EC: data.EC,
        //     DT: data.DT,
        //     data: 'success!'
        // });
    } catch (error) {
        return res.status(500).json({
            EM: 'err from server',
            EC: '',
            DT: '',
            data: 'err api'
        });
    }
};



const createFunc = async (req, res) => {
    try {
        let data = await userApiServices.createNewUser(req.body); // Corrected line
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
            data: 'success!'
        });
    } catch (error) {
        return res.status(500).json({
            EM: 'err from server',
            EC: '',
            DT: 'err create function usercontroller',
            data: 'err create function'
        });
    }
}

const updateFunc = async (req, res) => {
    try {
        let data = await userApiServices.updateUser(req.body);
        console.log(">>check id", req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
            data: 'success!'
        });
    } catch (error) {
        return res.status(500).json({
            EM: 'err from server',
            EC: '',
            DT: '',
            data: 'err updatefunc'
        });
    }
}
const deleteFunc = async (req, res) => {
    try {
        let data = await userApiServices.deleteUser(req.body.id);
        console.log(">>check id", req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
            data: 'success!'
        });
    } catch (error) {
        return res.status(500).json({
            EM: 'err from server',
            EC: '',
            DT: '',
            data: 'err api delete'
        });
    }
};
module.exports = {
    readFunc,
    createFunc,
    updateFunc,
    deleteFunc
}