import express, { Router } from "express";
import analyticsController from "../controllers/analytics.controller";

const analyticsRoutes: Router = express.Router();

analyticsRoutes.get("/top-products", analyticsController.getTopProducts);
analyticsRoutes.get("/top-users", analyticsController.getTopUsers);



export default analyticsRoutes;
