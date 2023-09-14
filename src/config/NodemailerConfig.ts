import nodemailer from "nodemailer";
export const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "personalid88704@gmail.com",
    pass: "qggcmrdtnsenfsvl",
  },
});

export const sendMail = async ({ email, subject, htmlData }: any) =>
  await transporter.sendMail({
    from: "Digital-Q Talent team",
    to: email,
    subject: subject,
    html: htmlData,
  });
