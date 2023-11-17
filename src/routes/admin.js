const express = require("express");
const pageController = require("../controllers/admin.controller");
const userController = require("../controllers/user.controller.web");
const adminRouter = express.Router();
adminRouter.get("/dashboard", pageController.indexPage);

//------------------------user //--------------------------
adminRouter.get("/dashboard/user", userController.userPage);
adminRouter.get("/dashboard/accesslevel", userController.accessLevel);

//------------------------news //--------------------------
adminRouter.get("/dashboard/news", pageController.new);

//------------------------login //-------------------------
adminRouter.get("/login", userController.loginPage);

module.exports = adminRouter;