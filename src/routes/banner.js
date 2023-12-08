
const express = require("express");
const multer = require("multer");
const bannerController = require("../controllers/Api/banner");
const bannerRouter = express.Router();


const uploadbanner = require('../utils/uploadbanner');
const upload = multer(uploadbanner);

//////all action from user //////////////////////////////////////
bannerRouter.post("/banner", multer(upload).single('banner'), bannerController.addHandler);
bannerRouter.delete("/banner/file/:filename", bannerController.deleteHanlerFile);
bannerRouter.get("/banner", bannerController.findAllBannerHandler);
bannerRouter.get("/banner/:id", bannerController.getBannerById);
bannerRouter.put("/banner/:id",multer(upload).single('banner'), bannerController.updateBannerHandler);
bannerRouter.delete("/banner/:id", bannerController.deleteHanler);

module.exports = bannerRouter;