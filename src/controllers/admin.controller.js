module.exports = {
 
    indexPage(req, res) {
    
        if (req.session.autorizado && req.session?.user?.type === 'admin' || req.session?.user?.type === 'manager' || req.session?.user?.type === 'assistent') {
            console.log("confirmado");
            res.render("admin/index", { session: req.session.user });
        } else {
            res.redirect("/login")
            console.log("não confirmado");
        }
    },
    new(req, res) {
        if (req.session.autorizado && req.session?.user?.type === 'admin' || req.session?.user?.type === 'manager' || req.session?.user?.type === 'assistent') {
            console.log("confirmado");
            res.render("admin/news", { session: req.session.user });
        } else {
            res.redirect("/login")
            console.log("não confirmado");
        }
    },


    async findAll(req, res) {
        res.render("admin/index");
    },
    async findOne(req, res) {
        res.render("admin/index");
    },

}