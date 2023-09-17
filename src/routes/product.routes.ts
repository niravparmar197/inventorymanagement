import express, { Router } from "express";
import productController from "../controllers/product.controller";

const productRoutes: Router = express.Router();

productRoutes.get("/", productController.getAllProducts);
productRoutes.get("/search", productController.searchProducts);
productRoutes.get("/:id", productController.getProductById);
productRoutes.post("/", productController.createProduct);
productRoutes.put("/:id", productController.updateProduct);
productRoutes.delete("/:id", productController.deleteProduct);

export default productRoutes;
