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
    accessLevel(req, res) {
        res.render("admin/accesslevel");
    },
    async new(req, res) {
        res.render("admin/register");
    },
}