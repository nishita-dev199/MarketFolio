import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    await dbConnect();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate userId
    const userId = crypto.randomUUID();

    // Create the new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
      userId,
    });

    return NextResponse.json(
      {
        message: "User registered successfully",
        user: {
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          userId: newUser.userId,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
