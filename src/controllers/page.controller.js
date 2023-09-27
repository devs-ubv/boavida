const { leadership, news, project } = require('../utils/project');
const { navegateRouter } = require("../utils/pagesRouter");
module.exports = {
    indexPage(req, res) {
        const data = {
            titulo: "Grupo Boavida - Grupo empresarial: Inovação e gestão por Angola",
            mensagem: "Bem-vindo ao EJS!",
            path: req.url,
        };
        res.render("index", { data });
    },
    async aboutPage(req, res) {
        const data = {
            titulo: "Grupo Boavida - Grupo empresarial: Inovação e gestão por Angola",
            mensagem: "Bem-vindo ao EJS!",
            path: req.url,
        };
        res.render("about", { data });
    },
    async newsPage(req, res) {
        const data = {
            titulo: "Grupo Boavida - Grupo empresarial: Inovação e gestão por Angola",
            mensagem: "Bem-vindo ao EJS!",
            path: req.url,
        };
        const news4 = news.map(objeto => ({
            ...objeto
        })).slice(0, 4);
        res.render("news", { data, smollNews: news4, fullNews: news });
    },
    newPage(req, res) {
        const data = {
            titulo: "Grupo Boavida - Grupo empresarial: Inovação e gestão por Angola",
            mensagem: "Bem-vindo ao EJS!",
            path: req.url,
        };
        const featured = news[parseInt(req.params.id) - 1];

        res.render("new", { data, pathName: parseInt(req.params.id), featured, news });
    },
    businessPage(req, res) {
        const data = {
            titulo: "Grupo Boavida - Grupo empresarial: Inovação e gestão por Angola",
            mensagem: "Bem-vindo ao EJS!",
            path: req.url,
        };
        res.render(navegateRouter(req.params.id), { data, leadership });
    },

    async contactPage(req, res) {
        const data = {
            titulo: "Grupo Boavida - Grupo empresarial: Inovação e gestão por Angola",
            mensagem: "Bem-vindo ao EJS!",
            path: req.url,
        };
        res.render("contact", { data });
    },
    companyPage(req, res) {
        const data = {
            titulo: "Grupo Boavida - Grupo empresarial: Inovação e gestão por Angola",
            mensagem: "Bem-vindo ao EJS!",
            path: req.url,
            pathName: req.params.id
        };
        const company = project[parseInt(req.params.id)];
        res.render("company", { data, pathName: parseInt(req.params.id), company });
    }

}