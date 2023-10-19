const express = require("express");
const pageController = require("../controllers/enPage.controller");
const enRouter = express.Router();
enRouter.get("/en", pageController.indexPage);
enRouter.get("/en/sobre-nos", pageController.aboutPage);
enRouter.get("/en/sobre-nos/quem-somos/", pageController.aboutPage);
enRouter.get("/en/news", pageController.newsPage);
enRouter.get("/en/new/:id", pageController.newPage);
enRouter.get("/en/unidade-de-negocios", pageController.businessPage);
enRouter.get("/en/unidade-de-negocios/:id", pageController.businessPage);
enRouter.get("/en/company/:id", pageController.companyPage);
enRouter.get("/en/contacto", pageController.contactPage);
enRouter.get("/sac", pageController.sacPage);


module.exports = enRouter;