import loginRegisterServices from "../services/loginRegisterServices";
const testAPI = (req, res) => {
    return res.status(200).json({
        message: 'ok',
        data: 'testAPI'
    })
}

const hanleRegister = async (req, res) => {
    try {
        // req.body email, phone, username, password
        console.log(">>> call me", req.body);
        if (!req.body.email || !req.body.phone || !req.body.password) {
            return res.status(200).json({
                EM: 'Missing required parameters',
                EC: '',
                DT: '1',
                data: 'err api'
            })
        }

        let data = await loginRegisterServices.registerNewUser(req.body)
        // services create user
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,     // err code 
            DT: '',        // date
            data: 'success!'
        })
    } catch (error) {
        return res.status(500).json({
            EM: 'err form server',  // err message
            EC: '',     // err code 
            DT: '',        // date
            data: 'err api'
        })
    }

}
module.exports = {
    testAPI,
    hanleRegister
}