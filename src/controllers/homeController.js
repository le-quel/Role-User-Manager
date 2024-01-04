const HandleHelloWorld = (req, res) => {
    const name = "homecontroller";
    return res.render("home.ejs", { name });
}

const HandleUserPage = (req, res) => {
    return res.render("user.ejs");
}

module.exports = {
    HandleHelloWorld,
    HandleUserPage
}