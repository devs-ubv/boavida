const { leadership, news, project } = require('../utils/project');
const { navegateRouter } = require("../utils/pagesRouter");
const New = require("../models/New");
const Video = require("../models/Video");
const { infoSiteData } = require('../utils/siteInfo');
module.exports = {
    async indexPage(req, res) {
        const allNews = await New.findAllSite();
        const data = infoSiteData(req);

        const news4 = allNews.map(objeto => ({
            ...objeto
        })).slice(0, 4);
        const news3 = allNews.map(objeto => ({
            ...objeto
        })).slice(0, 3);
        res.render("pt/index", { data, smollNews: news4, fullNews: news, news3 });
    },

    async aboutPage(req, res) {
        const data = infoSiteData(req);
        const news3 = news.map(objeto => ({
            ...objeto
        })).slice(0, 3);
        res.render("pt/about", { data, news3 });
    },
    
    async newPage(req, res) {
        const data = infoSiteData(req);
        const allNews = await New.findAllSite();
        const featured = await New.findById(req.params.id, allNews);

        const news = allNews.map(objeto => ({
            ...objeto
        })).slice(0, 4);
        const news3 = news.map(objeto => ({
            ...objeto
        })).slice(0, 3);
        res.render("pt/new", { data, pathName: parseInt(req.params.id), featuredId:parseInt(req.params.id), featured, news, news3 });
    },

    async newsPage(req, res) {
       try {
        const allNews = await New.findAllSite();
        const data = infoSiteData(req);
        const news4 = allNews.map(objeto => ({
            ...objeto
        })).slice(0, 4);
        const news3 = allNews.map(objeto => ({
            ...objeto
        })).slice(0, 3);
        res.render("pt/news", { data, smollNews: news4, fullNews: allNews, news3 });
       } catch (error) {
        
       }
    },
    
   /*  async videoPage(req, res) {
        const allVideos = await Video.findAllSite;
        const data = infoSiteData(req);
        const video3 = allVideos.map(objeto => ({
            ...objeto
        })).slice(0, 3);
        res.render("pt/video", { data, smollVideos: allVideos, video3 });
    }, */

    async videoPage(req, res) {
        const allVideos = await Video.findAllSite();
        const allNews = await New.findAllSite();
        const data = infoSiteData(req);
        const videos3 = allVideos.map(objeto => ({
            ...objeto
        })).slice(0, 3);
        const videos4 = allVideos.map(objeto => ({
            ...objeto
        })).slice(0, 4);
        const news3 = allNews.map(objeto => ({
            ...objeto
        })).slice(0, 3);

        res.render("pt/video", { data, smollVideos: videos3, fullVideos: videos4, fullNews: allNews, news3  });
    }, 

    businessPage(req, res) {
        const data = infoSiteData(req);
        const news3 = news.map(objeto => ({
            ...objeto
        })).slice(0, 3);
        res.render(navegateRouter(req.params.id), { data, leadership, news3 });
    },

    async contactPage(req, res) {
        const data = infoSiteData(req);
        const news3 = news.map(objeto => ({
            ...objeto
        })).slice(0, 3);
        res.render("pt/contact", { data, news3 });
    },
    companyPage(req, res) {
        const data = infoSiteData(req);
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