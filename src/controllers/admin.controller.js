module.exports = {
    indexPage(req, res) {
        res.render("admin/index");
    },

    async new(req, res) {
        res.render("admin/index");
    },
    async findAll(req, res) {
        res.render("admin/index");
    },
    async findOne(req, res) {
        res.render("admin/index");
    },
}