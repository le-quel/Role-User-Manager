import express from "express";

import apicontroller from "../controllers/apicontroller";

import UserController from "../controllers/UserController";
/**
 * @param {*} app: express app
 */
const router = express.Router();

const initApiRoutes = (app) => {

    // 4 method GET-R post-C put-U delete-D
    router.get("/test-api", apicontroller.testAPI)
    router.post("/register", apicontroller.hanleRegister)
    router.post("/login", apicontroller.handleLogin)
    router.get("/users/read/", UserController.readFunc);
    router.post("/users/create", UserController.createFunc);
    router.put("/users/update", UserController.updateFunc)
    router.delete("/users/delete", UserController.deleteFunc)
    return app.use("/api", router);
}
export default initApiRoutes;