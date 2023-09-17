import { Request, Response } from "express";
import analyticsService from "../services/analytics.service";

class AnalyticsController {
  async getTopProducts(req: Request, res: Response): Promise<void> {
    try {
      const limit = 5; // Adjust the limit as needed
      const topProducts = await analyticsService.getTopProducts(limit);
      res.json(topProducts);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
  async getTopUsers(req: Request, res: Response): Promise<void> {
    try {
      const limit = 5; // Adjust the limit as needed
      const topUsers = await analyticsService.getTopUsers(limit);
      res.json(topUsers);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

}

export default new AnalyticsController();
