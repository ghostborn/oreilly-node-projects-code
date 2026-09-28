import { createTransport, createTestAccount } from "nodemailer";

const testAccount = await createTestAccount();

const transporter = createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: testAccount.user,
    pass: testAccount.pass,
  },
});

export const sendMail = async (to, html) => {
  const mailOptions = {
    from: "jon@innbox.jonwexler.com",
    to,
    subject: "Email from Inn Box!",
    html,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.response}`);
  } catch (e) {
    console.log(`An error occurred: ${e.message}`);
  }
};
