import User, { IUser } from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "../config/config";

class AuthService {
  async register(
    username: string,
    password: string,
    email:string,
    name:string
  ): Promise<{ message: string }> {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, password: hashedPassword,name:name,email:email });
      await user.save();
      return { message: "User registered successfully" };
    } catch (error) {
      throw error;
    }
  }

  async login(username: string, password: string): Promise<{ token: string }> {
    try {
      const user = await User.findOne({ username });

      if (!user) {
        throw new Error("User not found");
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }

      const token = jwt.sign(
        { id: user._id, username: user.username },
        config.secretKey,
        {
          expiresIn: "1h", // Token expiration time
        }
      );

      return { token };
    } catch (error) {
      throw error;
    }
  }
}

export default new AuthService();
