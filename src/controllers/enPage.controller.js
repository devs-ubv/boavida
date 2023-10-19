const { leadership, news, project } = require('../utils/projectEn');
const { navegateRouterEn } = require("../utils/pagesRouter");
module.exports = {
    indexPage(req, res) {
        const data = {
            titulo: "Grupo Boavida - Business group: Innovation and management for Angola",
            mensagem: "Bem-vindo ao EJS!",
            path: req.url,
        };

        const news4 = news.map(objeto => ({
            ...objeto
        })).slice(0, 4);
        const news3 = news.map(objeto => ({
            ...objeto
        })).slice(0, 3);

        res.render("en/index", { data, smollNews: news4, fullNews: news, news3 });
    },

    async aboutPage(req, res) {
        const data = {
            titulo: "Grupo Boavida - Business group: Innovation and management for Angola",
            mensagem: "Bem-vindo ao EJS!",
            path: req.url,
        };
        const news3 = news.map(objeto => ({
            ...objeto
        })).slice(0, 3);
        res.render("en/about", { data, news3 });
    },
    async newsPage(req, res) {
        const data = {
            titulo: "Grupo Boavida - Business group: Innovation and management for Angola",
            mensagem: "Bem-vindo ao EJS!",
            path: req.url,
        };
        const news4 = news.map(objeto => ({
            ...objeto
        })).slice(0, 4);
        const news3 = news.map(objeto => ({
            ...objeto
        })).slice(0, 3);
        res.render("en/news", { data, smollNews: news4, fullNews: news, news3 });
    },
    newPage(req, res) {
        const data = {
            titulo: "Grupo Boavida - Business group: Innovation and management for Angola",
            mensagem: "Bem-vindo ao EJS!",
            path: req.url,
        };
        const featured = news[parseInt(req.params.id) - 1];
        const news3 = news.map(objeto => ({
            ...objeto
        })).slice(0, 3);
        res.render("en/new", { data, pathName: parseInt(req.params.id), featured, news, news3 });
    },
    businessPage(req, res) {
        const data = {
            titulo: "Grupo Boavida - Business group: Innovation and management for Angola",
            mensagem: "Bem-vindo ao EJS!",
            path: req.url,
        };
        const news3 = news.map(objeto => ({
            ...objeto
        })).slice(0, 3);
        res.render(navegateRouterEn(req.params.id), { data, leadership, news3 });
    },

    async contactPage(req, res) {
        const data = {
            titulo: "Grupo Boavida - Business group: Innovation and management for Angola",
            mensagem: "Bem-vindo ao EJS!",
            path: req.url,
        };
        const news3 = news.map(objeto => ({
            ...objeto
        })).slice(0, 3);
        res.render("en/contact", { data, news3 });
    },
    companyPage(req, res) {
        const data = {
            titulo: "Grupo Boavida - Business group: Innovation and management for Angola",
            mensagem: "Bem-vindo ao EJS!",
            path: req.url,
            pathName: req.params.id
        };
        const news3 = news.map(objeto => ({
            ...objeto
        })).slice(0, 3);
        const company = project[parseInt(req.params.id)];
        res.render("en/company", { data, pathName: parseInt(req.params.id), company, news3 });
    },

    sacPage(req, res) {
        res.redirect("https://sac-suporte.onrender.com/");
    }




}