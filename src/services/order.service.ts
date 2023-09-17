import Order, { IOrder } from "../models/order.model";
import Product, { IProduct } from "../models/product.model";
import OrderDetails,{IOrderDetails} from "../models/order-details.model";

class OrderService {
  async getAllOrders(userId:string): Promise<IOrder[]> {
    return await Order.find({where:{user_id:userId}});
  }

  async getOrderById(id: string): Promise<IOrder | null> {
    return await Order.findById(id);
  }

  async placeOrder(orderData: IOrder): Promise<IOrder> {
    try {
      const productsToUpdate: any[] = [];

      for (const orderItem of orderData.items) {
        const product = await Product.findById(orderItem.product_id);
        if (!product) {
          throw new Error(`Product not found for id: ${orderItem.product_id}`);
        }

        if (product.available_quantity < orderItem.quantity) {
          throw new Error(`Insufficient quantity for product: ${product.name}`);
        }

        product.available_quantity -= orderItem.quantity;
        productsToUpdate.push(product);
      }

      // Update the available_quantity for each product
      await Promise.all(productsToUpdate.map((product) => product.save()));

      // Create and save the order
      const order = new Order(orderData);

      for (const orderItem of orderData.items) {
        const orderDetails = await new OrderDetails({
          order_id: order._id,
          product_id: orderItem.product_id,
          quantity: orderItem.quantity,
          price: orderItem?.price,
        });
        await orderDetails.save();

      }

      return await order.save();
    } catch (error) {
      throw error;
    }
  }
}

export default new OrderService();
