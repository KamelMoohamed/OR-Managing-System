const nodemailer = require("nodemailer");
exports.sendMail = (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "orsystem8@gmail.com",
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  var mailOptions = {
    from: "orsystem8@gmail.com",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
