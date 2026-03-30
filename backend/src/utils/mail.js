import nodemailer from "nodemailer";

export default async function sendMail(to, subject, text) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_SECRET,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL,
    to: to,
    subject: subject,
    text: text,
  };

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.error(error);
    else {
      console.log(`Email sent: ${info.response}`);
    }
  });
}
