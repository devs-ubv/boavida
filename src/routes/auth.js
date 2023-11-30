const express = require("express");
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/Api/user");
const permissionController = require("../controllers/Api/permission");
const multer = require('multer');
const uploadConfigFoto = require('../utils/uploadUser');
const upload = multer(uploadConfigFoto);


const authRouter = express.Router();
authRouter.post("/me", authController.auth);
authRouter.get('/logout', authController.logout);

//////all action from permission //////////////////////////////////////
authRouter.get("/permission", permissionController.findAllPermissionHandler);
authRouter.get("/permission/:id", permissionController.getByIdHandler);
authRouter.post("/permission", permissionController.addHandler);
authRouter.put("/permission/:id", permissionController.updateHandler);
authRouter.delete("/permission/:id", permissionController.deleteHandler);

//////all action from user //////////////////////////////////////
authRouter.post("/register", multer(upload).single('userProfile'), userController.addHandler);
authRouter.get("/user", userController.findAllUserHandler);
authRouter.get("/user/:id", userController.getUserById);
authRouter.put("/user/upload", multer(upload).single('userProfile'),  userController.updateProfileHandler);
authRouter.put("/user/:id", userController.updateHandler);
authRouter.delete("/user/:id", userController.deleteHanler);

module.exports = authRouter;