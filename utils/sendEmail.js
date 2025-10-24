import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Gmail App Password
  },
});

export const sendOtpEmail = async (to, otp) => {
  await transporter.sendMail({
    from: `"TaskFlow" <${process.env.GMAIL_USER}>`,
    to,
    subject: "Your TaskFlow OTP Code",
    text: `Your OTP is ${otp}. It expires in 5 minutes.`,
  });
};
