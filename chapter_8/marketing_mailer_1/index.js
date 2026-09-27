import nodemailer from "nodemailer";

const html = `<html>
  <body>
     <h1>Confirm your email</h1>
     <p>Please click the link below to confirm your email address.</p>
     <p><a href="https://example.com/confirm">Confirm email</a></p>
   </body>
  </html>`;

async function sendMail() {
  try {
    // 创建 Ethereal 测试账号（仅用于开发/测试）
    const testAccount = await nodemailer.createTestAccount();
    // 使用 Ethereal SMTP 创建 transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    // 邮件选项：包含text作为纯文本回退
    const mailOptions = {
      from: '"Inn Box" <noreply@innbox.jonwexler.com>',
      to: "1094425279@qq.com",
      subject: "Welcome to Inn Box!",
      text: "Confirm your email — please open the HTML version for details.",
      html,
    };
    // 发送邮件
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent, messageId:", info.messageId);
    console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
    // 可选：在开发时打印测试账号凭据，方便重用或调试
    console.log("Ethereal account user:", testAccount.user);
  } catch (err) {
    console.error("An error occurred while sending email:", err);
    process.exitCode = 1;
  }
}

sendMail();
