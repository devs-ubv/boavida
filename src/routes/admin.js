const express = require("express");
const pageController = require("../controllers/admin.controller");
const userController = require("../controllers/user.controller.web");
const adminRouter = express.Router();
adminRouter.get("/dashboard", pageController.indexPage);

//------------------------user //--------------------------
adminRouter.get("/dashboard/profile", userController.profilePage);
adminRouter.get("/dashboard/user", userController.userPage);
adminRouter.get("/dashboard/accesslevel", userController.accessLevel);
adminRouter.get("/dashboard/user/:page/:id", userController.userPage);
//------------------------banner //--------------------------
adminRouter.get("/dashboard/banner/:page/:id", pageController.bannerPage);
adminRouter.get("/dashboard/banner/:id", pageController.bannerPageId);

//------------------------banner //--------------------------
adminRouter.get("/dashboard/video/:page/:id", pageController.videoPage);
adminRouter.get("/dashboard/video/:id", pageController.videoPageId);


//------------------------news //--------------------------
adminRouter.get("/dashboard/news/:page/:id", pageController.new);
adminRouter.get("/dashboard/news/:id", pageController.newId); 


//------------------------login //-------------------------
adminRouter.get("/login", userController.loginPage);

module.exports = adminRouter;