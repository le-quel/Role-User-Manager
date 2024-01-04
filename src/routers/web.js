import express from "express";
import homeController from "../controllers/homeController";

/**
 * @param {*} app: express app
 */
const router = express.Router();

const initWebRoutes = (app) => {
    router.get("/", homeController.HandleHelloWorld)
    router.get("/user", homeController.HandleUserPage)

    return app.use("/", router);
}
export default initWebRoutes;