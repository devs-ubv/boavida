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

        res.render("pt/index", { data, smollNews: news4, fullNews: news, news3 });
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
        res.render("pt/about", { data, news3 });
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
        res.render("pt/news", { data, smollNews: news4, fullNews: news, news3 });
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
        res.render("pt/new", { data, pathName: parseInt(req.params.id), featured, news, news3 });
    },
    async videoPage(req, res) {
        const data = {
            titulo: "Grupo Boavida - Grupo empresarial: Inovação e gestão por Angola",
            mensagem: "Bem-vindo ao EJS!",
            path: req.url,
        };
        const news3 = news.map(objeto => ({
            ...objeto
        })).slice(0, 3);


        res.render("pt/video", { data, pathName: parseInt(req.params.id), news, fullNews: news, news3 });
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
        res.render("pt/contact", { data, news3 });
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
        res.render("pt/company", { data, pathName: parseInt(req.params.id), company, news3 });
    },

    sacPage(req, res) {
        res.redirect("https://sac.grupoboavida.co.ao/");
    }
}