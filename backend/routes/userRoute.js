import express from "express";
import controller from "../controllers/userController.js";
const ROUTE = express.Router();

// respond with "hello world" when a GET request is made to the homepage
ROUTE.route("/createRegisterFolder").post(controller.createRegisterFolder);
ROUTE.route("/deleteCompletely").post(controller.deleteCompletely);
ROUTE.route("/getFile").post(controller.getFile);
ROUTE.route("/writeFile").post(controller.writeFile);
ROUTE.route("/openHtml").post(controller.openHtml);
ROUTE.route("/saveWorkOnHome").post(controller.saveWorkOnHome);

export default ROUTE;
