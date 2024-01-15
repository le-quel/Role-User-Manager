import express from "express";
import homeController from "../controllers/homeController";
import apicontroller from "../controllers/apicontroller";
/**
 * @param {*} app: express app
 */
const router = express.Router();

const initWebRoutes = (app) => {
    router.get("/", homeController.HandleHelloWorld)
    router.get("/user", homeController.HandleUserPage)
    router.post("/user/create-user", homeController.HandleCreateNewUser)
    router.get("/getall-user", homeController.Handle_getallUser)
    router.post("/delete-user/:id", homeController.HandleDeleteUser)
    router.get("/update-user/:id", homeController.getUpdateUser)
    router.post("/user/update-user", homeController.HandleUpdateUser)
    // 4 method GET-R post-C put-U delete-D
    router.get("/api/test-api", apicontroller.testAPI)
    return app.use("/", router);
}
export default initWebRoutes;