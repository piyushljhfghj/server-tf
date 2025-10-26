// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS, // Gmail App Password
//   },
// });

// export const sendOtpEmail = async (to, otp) => {
//   await transporter.sendMail({
//     from: `"TaskFlow" <${process.env.EMAIL_USER}>`,
//     to,
//     subject: "Your TaskFlow OTP Code",
//     text: `Your OTP is ${otp}. It expires in 5 minutes.`,
//   });
// };




// backend/utils/sendEmail.js
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// ✅ Function to send OTP email using Resend API
export const sendOtpEmail = async (to, otp) => {
  try {
    const response = await resend.emails.send({
      from: "TaskFlow <onboarding@resend.dev>", // you can change after domain verification
      to,
      subject: "Your TaskFlow OTP Code",
      html: `
        <div style="font-family:sans-serif;padding:20px;">
          <h2>TaskFlow Verification</h2>
          <p>Your OTP code is:</p>
          <h1 style="color:#6C63FF;">${otp}</h1>
          <p>This code is valid for 5 minutes.</p>
        </div>
      `,
    });

    console.log("✅ OTP Email sent:", response);
  } catch (error) {
    console.error("❌ Error in sendOtp (Resend):", error);
    throw error;
  }
};

