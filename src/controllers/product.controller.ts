import { Request, Response } from "express";
import Product, { IProduct } from "../models/product.model";
import productService from "../services/product.service";

class ProductController {
  async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const products: IProduct[] = await productService.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getProductById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const product: IProduct | null = await productService.getProductById(id);
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async createProduct(req: Request, res: Response): Promise<void> {
    const productData: IProduct = req.body;
    try {
      const product: IProduct = await productService.createProduct(productData);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateProduct(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const productData: IProduct = req.body;
    try {
      const updatedProduct: IProduct | null =
        await productService.updateProduct(id, productData);
      if (updatedProduct) {
        res.json(updatedProduct);
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteProduct(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      await productService.deleteProduct(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
  async searchProducts(req: Request, res: Response): Promise<void> {
    try {
      const query = req.query.value as string;
      if (!query) {
        res.status(400).json({ error: "Search query is required" });
        return;
      }

      const products = await productService.searchProducts(query);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new ProductController();
