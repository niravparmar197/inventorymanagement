import express, { Router } from "express";
import orderController from "../controllers/order.controller";
import authMiddleware from "../middleware/auth.middleware";

const ordersRouter: Router = express.Router();

ordersRouter.get("/", authMiddleware, orderController.getAllOrders);
ordersRouter.get("/:id", authMiddleware, orderController.getOrderById);
ordersRouter.post("/", authMiddleware, orderController.placeOrder);

export default ordersRouter;
