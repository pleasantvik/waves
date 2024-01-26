const nodeMailer = require("nodemailer");
const Mailgen = require("mailgen");

const dotenv = require("dotenv");

dotenv.config({
  path: "./config.env",
});

let transporter = nodeMailer.createTransport({
  service: "Gmail",
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const registerEmail = async (userEmail, user) => {
  try {
    const emailToken = await user.generateRegisterToken();

    let mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Waves Guitars",
        link: `${process.env.EMAIL_MAIL_URL}`,
      },
    });

    const email = {
      body: {
        name: `${user.firstname} ${user.lastname}` || userEmail,
        intro: `Welcome to Waves!. We're very excited to have you onboard`,
        action: {
          instruction: `To validate your account, please click here`,
          button: {
            color: "#1a73e8",
            text: "Validate your account",
            link: `${process.env.SITE_DOMAIN}verification?t=${emailToken}`,
          },
        },
        outro: `Need help or have questions? Just respond to this email, we'd love to help`,
      },
    };
    let emailBody = mailGenerator.generate(email);
    let message = {
      from: process.env.EMAIL,
      to: userEmail,
      subject: "Welcome to waves",
      html: emailBody,
    };

    await transporter.sendMail(message);

    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  registerEmail,
};
