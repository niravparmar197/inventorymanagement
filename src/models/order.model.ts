import { Schema, Document, model } from "mongoose";

export interface IOrder extends Document {
  user_id: string;
  total_price: number;
  items: [{ product_id: string; quantity: number; price:number;}];
  status: "pending" | "shipped" | "completed";
}

const orderSchema = new Schema<IOrder>({
  user_id: { type: String, required: true },
  total_price: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "shipped", "completed"],
    required: true,
  },
});

export default model<IOrder>("Order", orderSchema);
