import mongoose, { Schema, models, Model } from "mongoose";

export interface IAdmin {
  email: string;
  password?: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

const adminSchema = new Schema<IAdmin>(
  {
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
      default: "admin",
      enum: ["admin", "superadmin"],
    },
  },
  { timestamps: true }
);

// Mongoose automatically looks for the plural, lowercased version of your model name.
// Thus, the model "Admin" is for the "admins" collection in the database.
const Admin: Model<IAdmin> = models.Admin || mongoose.model<IAdmin>("Admin", adminSchema);

export default Admin;
