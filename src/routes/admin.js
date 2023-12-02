const express = require("express");
const pageController = require("../controllers/admin.controller");
const userController = require("../controllers/user.controller.web");
const adminRouter = express.Router();
adminRouter.get("/dashboard", pageController.indexPage);

//------------------------user //--------------------------
adminRouter.get("/dashboard/profile", userController.profilePage);
adminRouter.get("/dashboard/user", userController.userPage);
adminRouter.get("/dashboard/accesslevel", userController.accessLevel);
adminRouter.get("/dashboard/user/:id", userController.userPage);

//------------------------banner //--------------------------
adminRouter.get("/dashboard/banner", userController.bannerPage);
adminRouter.get("/dashboard/banner/:id", userController.bannerPage);

//------------------------banner //--------------------------
adminRouter.get("/dashboard/video", pageController.videoPage);
adminRouter.get("/dashboard/video/:id", pageController.videoPage);


//------------------------news //--------------------------
adminRouter.get("/dashboard/news/:page/:id", pageController.new);
adminRouter.get("/dashboard/news/:id", pageController.newId); 


//------------------------login //-------------------------
adminRouter.get("/login", userController.loginPage);

module.exports = adminRouter;