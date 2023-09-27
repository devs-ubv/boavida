const express = require("express");
const pageController = require("../controllers/page.controller");
const pagesRouter = express.Router();
pagesRouter.get("/", pageController.indexPage);
pagesRouter.get("/about", pageController.aboutPage);
pagesRouter.get("/news", pageController.newsPage);
pagesRouter.get("/new/:id", pageController.newPage);
pagesRouter.get("/business-unit/:id", pageController.businessPage);
pagesRouter.get("/company/:id", pageController.companyPage);
pagesRouter.get("/contact", pageController.contactPage);


module.exports = pagesRouter;