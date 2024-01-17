const testAPI = (req, res) => {
    return res.status(200).json({
        message: 'ok',
        data: 'testAPI'
    })
}

const hanleRegister = (req, res) => {

    console.log(">>> call me", req.body);
}
module.exports = {
    testAPI,
    hanleRegister
}