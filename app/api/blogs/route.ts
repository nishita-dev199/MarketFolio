import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import { getToken } from "next-auth/jwt";

export async function GET() {
  try {
    await dbConnect();
    const blogs = await Blog.find({}).sort({ date: -1 });
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ 
      req, 
      secret: process.env.NEXTAUTH_SECRET 
    });
    const role = token?.role;

    console.log("POST Token:", !!token, "Role:", role);

    if (!token || (role !== "admin" && role !== "superadmin")) {
      return NextResponse.json({ error: "Unauthorized", role, hasToken: !!token }, { status: 401 });
    }

    await dbConnect();
    const data = await req.json();

    // ensure a slug is created if missing
    if (!data.slug && data.title) {
      data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }

    console.log("POST Data:", data);
    const newBlog = await Blog.create(data);
    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.error("Error creating blog:", error);
    const message = error instanceof Error ? error.message : "Failed to create blog";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
