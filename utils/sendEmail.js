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
import nodemailer from "nodemailer";

// ✅ Create reusable transporter object
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587, // or 465 if you want SSL
  secure: false, // true for port 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// ✅ Function to send OTP email
export const sendOtpEmail = async (to, otp) => {
  try {
    const mailOptions = {
      from: `"TaskFlow" <${process.env.EMAIL_USER}>`,
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
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}`);
  } catch (error) {
    console.error("❌ Error in sendOtp:", error);
    throw error;
  }
};
