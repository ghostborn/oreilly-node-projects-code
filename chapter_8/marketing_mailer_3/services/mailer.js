import {
  createTransport,
  createTestAccount,
  getTestMessageUrl,
} from "nodemailer";

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
    console.log("Preview URL:", getTestMessageUrl(info));
    // 可选：在开发时打印测试账号凭据，方便重用或调试
    console.log("Ethereal account user:", testAccount.user);
  } catch (e) {
    console.log(`An error occurred: ${e.message}`);
  }
};
