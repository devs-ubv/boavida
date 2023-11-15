
const express = require("express");
const contentController = require("../controllers/Api/newContent");
const contentRouter = express.Router();

//////all action from user //////////////////////////////////////
contentRouter.post("/content", contentController.addHandler);
contentRouter.delete("/content/file/:filename", contentController.deleteHanlerFile);
contentRouter.get("/content", contentController.findAllContentHandler);
contentRouter.get("/content/:id", contentController.getContentById);
contentRouter.put("/content/:id", contentController.updateContentHandler);
contentRouter.delete("/content/:id", contentController.deleteHanler);

module.exports = contentRouter;