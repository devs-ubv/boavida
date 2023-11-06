const express = require("express");
const pageController = require("../controllers/admin.controller");
const userController = require("../controllers/user.controller");
const adminRouter = express.Router();
adminRouter.get("/dashboard", pageController.indexPage);
adminRouter.get("/dashboard/new", pageController.findAll);
adminRouter.get("/dashboard/new/:newId", pageController.findOne);




//------------------------user //--------------------------
adminRouter.get("/dashboard/user", userController.userPage);
adminRouter.get("/dashboard/accesslevel", userController.accessLevel);

//------------------------login //-------------------------
adminRouter.get("/login", userController.loginPage);

module.exports = adminRouter;