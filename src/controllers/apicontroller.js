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
                data: 'err '
            })
            if (req.body.password && req.body.password.length < 4) {
                return res.status(200).json({
                    EM: 'Your password mush more than 3 letters',
                    EC: '',
                    DT: '1',
                    data: 'err length password'
                })
            }
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

const handleLogin = async (req, res) => {
    try {
        const result = await loginRegisterServices.handleUserLogin(req.body);

        if (result.EC === 0) {
            return res.status(200).json({
                EM: 'Login successful',
                EC: '0',
                DT: '',
                data: 'Login success!'
            });
        } else {
            return res.status(401).json({
                EM: 'Login failed',
                EC: result.EC,
                DT: result.DT,
                data: 'Invalid email/phone or password'
            });
        }
    } catch (error) {
        console.error(error);

        // Handle unexpected errors
        return res.status(500).json({
            EM: 'Internal Server Error',
            EC: '2',
            DT: '',
            data: 'Error occurred on the server'
        });
    }
}


module.exports = {
    testAPI,
    hanleRegister,
    handleLogin
}