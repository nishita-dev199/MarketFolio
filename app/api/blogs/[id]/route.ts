import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    // try finding by ID or Slug
    let blog = null;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      blog = await Blog.findById(id);
    }
    if (!blog) {
      blog = await Blog.findOne({ slug: id });
    }

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const token = await getToken({ 
      req, 
      secret: process.env.NEXTAUTH_SECRET 
    });
    const role = token?.role;

    console.log("PUT Token:", !!token, "Role:", role);

    if (!token || (role !== "admin" && role !== "superadmin")) {
      return NextResponse.json({ error: "Unauthorized", role, hasToken: !!token }, { status: 401 });
    }

    await dbConnect();
    const { id } = await params;
    const data = await req.json();

    console.log("PUT ID:", id, "Data:", data);
    const blog = await Blog.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Error updating blog:", error);
    const message = error instanceof Error ? error.message : "Failed to update blog";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const token = await getToken({ 
      req, 
      secret: process.env.NEXTAUTH_SECRET 
    });
    const role = token?.role;

    if (!token || (role !== "admin" && role !== "superadmin")) {
      return NextResponse.json({ error: "Unauthorized", role }, { status: 401 });
    }

    await dbConnect();
    const { id } = await params;

    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}
