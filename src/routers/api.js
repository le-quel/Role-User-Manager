import express from "express";

import apicontroller from "../controllers/apicontroller";
/**
 * @param {*} app: express app
 */
const router = express.Router();

const initApiRoutes = (app) => {

    // 4 method GET-R post-C put-U delete-D
    router.get("/test-api", apicontroller.testAPI)
    router.post("/register", apicontroller.hanleRegister)
    return app.use("/api/v14", router);
}
export default initApiRoutes;