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



import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
