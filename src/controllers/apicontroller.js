const testAPI = (req, res) => {
    return res.status(200).json({
        message: 'ok',
        data: 'testAPI'
    })
}

module.exports = {
    testAPI
}