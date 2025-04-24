import { Router } from "express";
import authUser from "../middlewares/authUser.js";
import { contact } from "../controllers/contact.controller.js";

const contactRouter = Router();

contactRouter.post("/contact", authUser, contact);

export default contactRouter;