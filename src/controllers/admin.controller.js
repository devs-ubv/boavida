const { findById } = require("../models/New");

module.exports = {

    indexPage(req, res) {

        if (req.session.autorizado && req.session?.user?.type === 'admin' || req.session?.user?.type === 'manager' || req.session?.user?.type === 'assistent') {
            res.render("admin/index", { session: req.session.user });
        } else {
            res.redirect("/login")
        }
    },
    new(req, res) {
        if (req.session.autorizado && req.session?.user?.type === 'admin' || req.session?.user?.type === 'manager' || req.session?.user?.type === 'assistent') {
            const { page, id } = req.params;
            
            res.render("admin/news", { session: req.session.user, params:{page, id} });
        } else {
            res.redirect("/login")
        }
    },
    async newId(req, res) {
        if (req.session.autorizado && req.session?.user?.type === 'admin' || req.session?.user?.type === 'manager' || req.session?.user?.type === 'assistent') {
            const idNew = req.params.id;
           
            console.log(req.params);
            res.render("admin/new", { session: req.session.user, idNew});
        } else {
            res.redirect("/login")
        }
    },
    async findAll(req, res) {
        res.render("admin/index");
    },
    async findOne(req, res) {
        res.render("admin/index");
    },

}