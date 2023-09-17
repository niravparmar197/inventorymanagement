import Product, { IProduct } from "../models/product.model";
import { Request, Response } from "express";

class ProductService {
  async getAllProducts(): Promise<IProduct[]> {
    return await Product.find();
  }

  async getProductById(id: string): Promise<IProduct | null> {
    return await Product.findById(id);
  }

  async createProduct(productData: IProduct): Promise<IProduct> {
    return await Product.create(productData);
  }

  async updateProduct(
    id: string,
    productData: IProduct
  ): Promise<IProduct | null> {
    return await Product.findByIdAndUpdate(id, productData, { new: true });
  }

  async deleteProduct(id: string): Promise<void> {
    await Product.findByIdAndDelete(id);
  }
  async searchProducts(query: string): Promise<IProduct[]> {
    try {
      const searchRegex = new RegExp(query, "i"); // Case-insensitive search
      const products = await Product.find({
        $or: [
          { name: { $regex: searchRegex } },
          { description: { $regex: searchRegex } },
        ],
      });
      return products;
    } catch (error) {
      throw error;
    }
  }
}

export default new ProductService();
