import { Request, Response } from "express";
import authService from "../services/auth.service";

class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    const { username, password,name,email } = req.body;

    try {
      const result = await authService.register(username, password,name,email);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;

    try {
      const result = await authService.login(username, password);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

}

export default new AuthController();
