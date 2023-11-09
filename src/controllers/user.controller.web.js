const Permission = require("../models/Permission");

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
    newsPage(req, res) {
        res.render("admin/news");
    },
    
    async accessLevel(req, res) {
        try {
            const { limit, page, search } = req.query;
            const permission = await Permission.findAll({ limit, page, search });
            res.render("admin/accesslevel", { permission });
        } catch (e) {
            return res.status(409).send(e.message);
        }
    },
    

    async new(req, res) {
        res.render("admin/register");
    },
}