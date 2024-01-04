import express from "express";
import homeController from "../controllers/homeController";

/**
 * @param {*} app: express app
 */
const router = express.Router();

const initWebRoutes = (app) => {
    router.get("/", homeController.HandleHelloWorld)
    router.get("/user", homeController.HandleUserPage)
    router.post("/user/create-user", homeController.HandleCreateNewUser)
    router.get("/getall-user", homeController.Handle_getallUser)
    return app.use("/", router);
}
export default initWebRoutes;