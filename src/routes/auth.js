const express = require("express");
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const permissionController = require("../controllers/permission.controller");
const authRouter = express.Router();
authRouter.post("/me", authController.auth);


//////all action from permission //////////////////////////////////////
authRouter.get("/permission", permissionController.findAllPermissionHandler);
authRouter.get("/permission/:id", permissionController.getByIdHandler);
authRouter.post("/permission", permissionController.addHandler);
authRouter.put("/permission/:id", permissionController.updateHandler);
authRouter.delete("/permission/:id", permissionController.deleteHandler);

//////all action from user //////////////////////////////////////
authRouter.post("/register", userController.addHandler);
authRouter.get("/user", userController.findAllUserHandler);
authRouter.get("/user/:id", userController.getUserById);
authRouter.put("/user/:id", userController.updateHandler);
module.exports = authRouter;