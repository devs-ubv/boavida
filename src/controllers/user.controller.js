module.exports = {
    indexPage(req, res) {
        res.render("admin/login");
    },

    userPage(req, res) {
        res.render("admin/user");
    },

    async new(req, res) {
        res.render("admin/register");
    },
}