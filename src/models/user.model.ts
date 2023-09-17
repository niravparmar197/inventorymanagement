import { Schema, Document, model } from "mongoose";

export interface IUser extends Document {
  name: string;
  username: string;
  password: string;
  email: string;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    unique: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default model<IUser>("User", userSchema);
