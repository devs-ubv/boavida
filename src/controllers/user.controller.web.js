const Permission = require("../models/Permission");

module.exports = {
    indexPage(req, res) {
        res.render("admin/login");
    },

    userPage(req, res) {
        if (req.session.autorizado && req.session?.user?.type === 'admin' || req.session?.user?.type === 'manager' || req.session?.user?.type === 'assistent') {
            res.render("admin/user", { session: req.session.user });
        } else {
            res.redirect("/login")
        }
    },

    loginPage(req, res) {
        res.render("admin/login");
    },
    async accessLevel(req, res) {
        
        try {
            if (req.session.autorizado && req.session?.user?.type === 'admin' || req.session?.user?.type === 'manager' || req.session?.user?.type === 'assistent') {
            const { limit, page, search } = req.query;
            const permission = await Permission.findAll({ limit, page, search });
            res.render("admin/accesslevel", {session: req.session.user,  permission });
            }
        } catch (e) {
            return res.status(409).send(e.message);
        }

    },
    async new(req, res) {
        res.render("admin/register");
    },
}