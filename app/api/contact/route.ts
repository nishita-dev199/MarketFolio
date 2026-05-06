import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, website, message } = await req.json();

    // Server-side validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, Email, and Message are required." },
        { status: 400 }
      );
    }

    const nameRegex = /^[^0-9]+$/;
    if (!nameRegex.test(name)) {
      return NextResponse.json(
        { error: "Name cannot contain numbers." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format." },
        { status: 400 }
      );
    }

    if (message.length < 10) {
      return NextResponse.json(
        { error: "Message must be at least 10 characters." },
        { status: 400 }
      );
    }

    // Configure Nodemailer with Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "[EMAIL_ADDRESS]",
      subject: `New Inquiry from ${name} - Evander Website`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #111;">
          <h2 style="border-bottom: 2px solid #000; padding-bottom: 10px;">New Inquiry Received</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Website:</strong> ${website || "N/A"}</p>
          <div style="margin-top: 20px; padding: 15px; background: #f5f5f5; border-radius: 8px;">
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p style="margin-top: 30px; font-size: 12px; color: #888;">Sent from Evander Digital Marketing Website</p>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Inquiry sent successfully!" }, { status: 200 });
  } catch (error: unknown) {
    console.error("Email Error:", error);
    return NextResponse.json(
      { error: "Failed to send inquiry. Please try again later." },
      { status: 500 }
    );
  }
}
