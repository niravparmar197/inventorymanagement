import { Request, Response } from "express";
import orderService from "../services/order.service";
import { IOrder } from "../models/order.model";

class OrderController {
  async getAllOrders(req: any, res: Response): Promise<void> {
    let userId= req.user._id
    try {
      const orders: IOrder[] = await orderService.getAllOrders(userId);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getOrderById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const order: IOrder | null = await orderService.getOrderById(id);
      if (order) {
        res.json(order);
      } else {
        res.status(404).json({ error: "Order not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async placeOrder(req: Request, res: Response): Promise<void> {
    const orderData: IOrder = req.body;
    try {
      const placedOrder: IOrder = await orderService.placeOrder(orderData);
      res.status(201).json(placedOrder);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new OrderController();
