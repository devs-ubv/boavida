const { leadership, news, project } = require('../utils/project');
const { navegateRouter } = require("../utils/pagesRouter");
module.exports = {
    indexPage(req, res) {
        const data = {
            titulo: "Grupo Boavida - Grupo empresarial: Inovação e gestão por Angola",
            mensagem: "Bem-vindo ao EJS!",
            path: req.url,
        };
        const news4 = news.map(objeto => ({
            ...objeto
        })).slice(0, 4);
        const news3 = news.map(objeto => ({
            ...objeto
        })).slice(0, 3);
        res.render("index", { data, smollNews: news4, fullNews: news, news3 });
    },
    async aboutPage(req, res) {
        const data = {
            titulo: "Grupo Boavida - Grupo empresarial: Inovação e gestão por Angola",
            mensagem: "Bem-vindo ao EJS!",
            path: req.url,
        };
        const news3 = news.map(objeto => ({
            ...objeto
        })).slice(0, 3);
        res.render("about", { data, news3 });
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
        const news3 = news.map(objeto => ({
            ...objeto
        })).slice(0, 3);
        res.render("news", { data, smollNews: news4, fullNews: news, news3 });
    },
    newPage(req, res) {
        const data = {
            titulo: "Grupo Boavida - Grupo empresarial: Inovação e gestão por Angola",
            mensagem: "Bem-vindo ao EJS!",
            path: req.url,
        };
        const featured = news[parseInt(req.params.id) - 1];
        const news3 = news.map(objeto => ({
            ...objeto
        })).slice(0, 3);

        res.render("new", { data, pathName: parseInt(req.params.id), featured, news, news3 });
    },
    businessPage(req, res) {
        const data = {
            titulo: "Grupo Boavida - Grupo empresarial: Inovação e gestão por Angola",
            mensagem: "Bem-vindo ao EJS!",
            path: req.url,
        };
        const news3 = news.map(objeto => ({
            ...objeto
        })).slice(0, 3);
        res.render(navegateRouter(req.params.id), { data, leadership, news3 });
    },

    async contactPage(req, res) {
        const data = {
            titulo: "Grupo Boavida - Grupo empresarial: Inovação e gestão por Angola",
            mensagem: "Bem-vindo ao EJS!",
            path: req.url,
        };
        const news3 = news.map(objeto => ({
            ...objeto
        })).slice(0, 3);
        res.render("contact", { data, news3 });
    },
    companyPage(req, res) {
        const data = {
            titulo: "Grupo Boavida - Grupo empresarial: Inovação e gestão por Angola",
            mensagem: "Bem-vindo ao EJS!",
            path: req.url,
            pathName: req.params.id
        };
        const news3 = news.map(objeto => ({
            ...objeto
        })).slice(0, 3);
        const company = project[parseInt(req.params.id)];
        res.render("company", { data, pathName: parseInt(req.params.id), company, news3 });
    }

}