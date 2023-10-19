const express = require("express");
const pageController = require("../controllers/page.controller");
const pagesRouter = express.Router();
pagesRouter.get("/", pageController.indexPage);
pagesRouter.get("/sobre-nos/", pageController.aboutPage);
pagesRouter.get("/sobre-nos/quem-somos/", pageController.aboutPage);
pagesRouter.get("/noticias", pageController.newsPage);
pagesRouter.get("/noticia/:id", pageController.newPage);
pagesRouter.get("/unidade-de-negocios", pageController.businessPage);
pagesRouter.get("/unidade-de-negocios/:id", pageController.businessPage);
pagesRouter.get("/company/:id", pageController.companyPage);
pagesRouter.get("/video", pageController.videoPage)
pagesRouter.get("/video/:id", pageController.companyPage);
pagesRouter.get("/contacto", pageController.contactPage);
pagesRouter.get("/sac", pageController.sacPage);


module.exports = pagesRouter;