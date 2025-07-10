import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendMail = async (options) => {
  let mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "QuickBite",
      link: "https://www.quickbite.in",
    },
  });

  var emailBody = mailGenerator.generate(options.mailGenContent);
  var emailText = mailGenerator.generatePlaintext(options.mailGenContent);

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
  });

  const mail = {
    from: `"QuickBite" <hello@QuickBite>`,
    to: options.email,
    subject: options.subject,
    text: emailText,
    html: emailBody,
  };

  try {
    await transporter.sendMail(mail);
  } catch (error) {
    console.error("Email Failed", error);
  }
};

// Factory Function

var forgotPasswordMailGenContent = function (username, passwordResetUrl) {
  return {
    body: {
      name: "John Appleseed",
      intro: "Welcome to QuickBite We're sending link to reset the password",
      action: {
        instructions: "To Reset your password, please click here:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "reset your password",
          link: passwordResetUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

export { sendMail, forgotPasswordMailGenContent };
