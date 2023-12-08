
const express = require("express");
const newController = require("../controllers/Api/new");
const photoController = require("../controllers/Api/photo");

const multer = require('multer');
const uploadConfigCover = require('../utils/uploadNew');
const uploadConfiImage = require('../utils/uploadImages');
const uploadCover = multer(uploadConfigCover);
const uploadImage = multer(uploadConfiImage);
const newRouter = express.Router();

//////all action from user //////////////////////////////////////
newRouter.post("/new", multer(uploadCover).single('cover'), newController.addHandler);
newRouter.delete("/new/file/:filename", newController.deleteHanlerFile);
newRouter.get("/new", newController.findAllNewHandler);
newRouter.get("/new/:id", newController.getNewById);
newRouter.get("/new/upload:id", newController.getNewById);
newRouter.put("/new/:id",  multer(uploadCover).single('cover'), newController.updateNewHandler);
newRouter.delete("/new/:id", newController.deleteHanler);




///upload images from news 

//////all action from user //////////////////////////////////////
newRouter.post("/upload", multer(uploadImage).single('image'), photoController.addHandler);
/* newRouter.delete("/upload/file/:filename", photoController.deleteHanlerFile); */
newRouter.get("/upload", photoController.findAllPhotoHandler);
newRouter.get("/upload/:id", photoController.getPhotoById);
newRouter.put("/upload/:id", photoController.updatePhotoHandler);
newRouter.delete("/upload/:id", photoController.deleteHanler);

module.exports = newRouter;