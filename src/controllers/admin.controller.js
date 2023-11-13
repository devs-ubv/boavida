module.exports = {
    indexPage(req, res) {
        if (req.session.autorizado && req.session?.user?.type === 'admin' || req.session?.user?.type === 'manager' || req.session?.user?.type === 'assistent') {
            res.render("admin/index", { session: req.session.user });
        } else {
            res.redirect("/login")
        }
    },
}