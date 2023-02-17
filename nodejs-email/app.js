const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const port = 3000;
require("dotenv").config();

function sendEmail() {
  return new Promise((resolve, reject) => {
    let transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "caiphus305@gmail.com",
        pass: 'ngibldqssyoralxt',
      },

      // address: "smtp.gmail.com",
      // port: 587,
      // domain: "gmail.com",
      // user_name: "YOUR_USERNAME@gmail.com",
      // password: "YOUR_PASSWORD",
      // authentication: "plain",
      // enable_starttls_auto: true,
    });

    const mailOptions = {
      to: "maanda305@gmail.com", // List of recipients
      from: "caiphus305@gmail.com", // Sender address
      subject: "Node Mailer example", // Subject line
      text: '<h2 style="color:#ff6600;">Hello People!, Welcome to Bacancy!</h2>',
    };

    transport.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
        return reject({ message: "errror occured" });
      } else {
        console.log(info);
        return resolve({ message: "Email Sent successfully..!" });
      }
    });
  });
}

app.get("/", (req,res) => {
  sendEmail()
    .then((response) => res.send(res.message))
    .catch((err) => res.status(500).send(err.message));
});

app.post("/sendmail", (req, res) => {
      return new Promise((resolve, reject) => {console.log(req.body)})
})

app.listen(port, () => {
  console.log(`Email server running on port: ${port}`);
});

// let transport = nodemailer.createTransport({
//     host: 'smtp.mailtrap.io',
//     port: 2525,
//     auth: {
//       user: process.env.EMAIL_USERNAME,
//       pass: process.env.EMAIL_PASSWORD
//     }
//  });

// port – if secure is false, it uses 587, by default, and 465 if true
// host – it’s an IP address/hostname for connecting to (by default to ‘localhost’)
// auth – it defines authentication data

//  let transport = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true,
//     auth: {
//       user: process.env.EMAIL_USERNAME,
//       pass: process.env.EMAIL_PASSWORD
//     }
//  });

// const mailOptions = {
//     from: 'amp@gmail.dev', // Sender address
//     to: 'caiphus305@gmail.com', // List of recipients
//     subject: 'Node Mailer', // Subject line
//     html: '<h2 style="color:#ff6600;">Hello People!, Welcome to Bacancy!</h2>',
//     attachments: [
//        { filename: 'profile.png', path: './images/profile.png' }
//     ]
// };

// transport.sendMail(mailOptions, function(err, info) {
//    if (err) {
//      console.log(err)
//    } else {
//      console.log(info);
//    }
// });
