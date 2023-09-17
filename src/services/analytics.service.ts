import OrderDetails from "../models/order-details.model";
import Order from "../models/order.model";
import User from "../models/user.model";
import Product from "../models/product.model";
const { ObjectId } = require("mongodb");

class AnalyticsService {
  async getTopProducts(limit: number): Promise<any[]> {
    try {
      const pipeline: any = [
        {
          $group: {
            _id: "$product_id",
            product_id: { $sum: 1 },
          },
        },
        {
          $sort: { totalProduct: -1 },
        },
        {
          $limit: 5,
        },
      ];

      const topProducts = await OrderDetails.aggregate(pipeline);
      let prods = [];
      for (const topProduct of topProducts) {
        let prod: any = await Product.findById(new ObjectId(topProduct._id));
        prod.totalProduct = topProduct.totalProduct;
        prods.push(prod);
      }
      return prods;
    } catch (error) {
      throw error;
    }
  }
  async getTopUsers(limit: number): Promise<any[]> {
    try {
      const pipeline: any = [
        {
          $group: {
            _id: "$user_id",
            totalOrders: { $sum: 1 },
          },
        },
        {
          $sort: { totalOrders: -1 },
        },
        {
          $limit: 5,
        },
      ];

      const topUsers = await Order.aggregate(pipeline);
      let users = [];
      for (const topUser of topUsers) {
        let user: any = await User.findById(new ObjectId(topUser._id));
        user.totalOrders = topUser.totalOrders;
        users.push(user);
      }
      return users;
    } catch (error) {
      throw error;
    }
  }
}

export default new AnalyticsService();
