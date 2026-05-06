import mongoose, { Schema, models, Model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password?: string;
  role: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
      enum: ["admin", "superadmin", "user"],
    },
    userId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const User: Model<IUser> = models.User || mongoose.model<IUser>("User", userSchema);

export default User;
