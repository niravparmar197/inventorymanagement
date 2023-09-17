import { Schema, Document, model } from "mongoose";

export interface IOrderDetails extends Document {
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
}

const orderDetailsSchema = new Schema<IOrderDetails>({
  order_id: { type: String, required: true },
  product_id: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

export default model<IOrderDetails>("OrderDetails", orderDetailsSchema);
