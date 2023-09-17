import express, { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import AuthController from "../controllers/auth.controller";

const router: Router = express.Router();

// Register a new user
router.post("/register", AuthController.register);
// Login
router.post("/login", AuthController.login);

// Protected route (requires authentication)
router.get("/profile", authMiddleware, (req, res) => {
  // Access user information using (req as any).user
  res.json({ message: "Authenticated route", user: (req as any).user });
});

export default router;
