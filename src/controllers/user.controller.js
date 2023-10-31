module.exports = {
    indexPage(req, res) {
        res.render("admin/login");
    },

    userPage(req, res) {
        res.render("admin/user");
    },

    loginPage(req, res) {
        res.render("admin/login");
    },
    userRegister(req, res) {
        res.render("admin/userRegister");
    },
    async new(req, res) {
        res.render("admin/register");
    },
}