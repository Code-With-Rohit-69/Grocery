import { Router } from "express";
import authUser from "../middlewares/authUser.js";
import { updateCart } from "../controllers/cart.controller.js";

const cartRouter = Router();

cartRouter.post("/update", authUser, updateCart);

export default cartRouter;
