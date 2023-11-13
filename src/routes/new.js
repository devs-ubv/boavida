
const express = require("express");
const newController = require("../controllers/Api/new");

const multer = require('multer');
const uploadConfiImage = require('../utils/uploadNew');
const upload = multer(uploadConfiImage);
const newRouter = express.Router();

//////all action from user //////////////////////////////////////
newRouter.post("/new", multer(upload).single('cover'), newController.addHandler);
newRouter.delete("/new/file/:filename", newController.deleteHanlerFile);
newRouter.get("/new", newController.findAllNewHandler);
newRouter.get("/new/:id", newController.getNewById);
newRouter.put("/new/:id", newController.updateNewHandler);
newRouter.delete("/new/:id", newController.deleteHanler);

module.exports = newRouter;