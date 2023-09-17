import { Schema, Document, model } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  available_quantity: number;
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  available_quantity: { type: Number, required: true },
});

export default model<IProduct>("Product", productSchema);
