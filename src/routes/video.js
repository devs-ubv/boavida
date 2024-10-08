
const express = require("express");
const multer = require("multer");
const videoController = require("../controllers/Api/video");
const videoRouter = express.Router();

const uploadbvideo = require('../utils/uploadbvideo');
const upload = multer(uploadbvideo);

//////all action from user //////////////////////////////////////
videoRouter.post("/video_api", multer(upload).single('image'), videoController.addHandler);
videoRouter.get("/video_api", videoController.findAllVideoHandler);
videoRouter.get("/video_api/:id", videoController.getVideoById);
videoRouter.put("/video_api/:id",multer(upload).single('image'), videoController.updateVideoHandler);
videoRouter.delete("/video_api/:id", videoController.deleteVideoHanler);
module.exports = videoRouter;