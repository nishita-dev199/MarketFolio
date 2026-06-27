/* eslint-disable @typescript-eslint/no-require-imports */
const { loadEnvConfig } = require("@next/env");
const projectDir = process.cwd();
loadEnvConfig(projectDir);

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const uri = process.env.MONGODB_URI;
console.log("URI:", uri ? "Found" : "Not Found");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, default: "user", enum: ["admin", "superadmin", "user"] },
  },
  { timestamps: true }
);

async function seed() {
    if (!uri) {
        console.error("No MONGODB_URI found.");
        return;
    }
    
    try {
        await mongoose.connect(uri);
        const User = mongoose.models.User || mongoose.model("User", userSchema);
        
        const email = process.env.EMAIL_USER || "contact@marketfolio.com";
        const password = "marketfolioadmin";
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            await User.create({
                email,
                password: hashedPassword,
                role: "admin"
            });
            console.log(`Successfully seeded admin user! Email: ${email}, Password: ${password}`);
        } else {
            console.log(`Admin user ${email} already exists.`);
        }
    } catch (e) {
        console.error("Error seeding DB:", e);
    } finally {
        await mongoose.disconnect();
    }
}
seed();
