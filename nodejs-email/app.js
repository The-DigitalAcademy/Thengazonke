const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const port = 3100;
require("dotenv").config();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

function sendEmail(to, subject, message) {

  const mailOptions = {
    to: to, // "maanda305@gmail.com", // List of recipients
    from: "caiphus305@gmail.com", // Sender address
    subject: subject, //"Node Mailer example", // Subject line
    text: message,
  };

  return new Promise((resolve, reject) => {

    let transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "caiphus305@gmail.com",
        pass: "ngibldqssyoralxt",
      },

    });


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

app.get("/", (req, res) => {
  sendEmail()
    .then((response) => res.send(res.message))
    .catch((err) => res.status(500).send(err.message));
});

app.post("/sendmail", (req, res) => {
 const {to ,message , subject } = req.body;
  return sendEmail(to, subject, message);
});

app.listen(port, () => {
  console.log(`Email server running on port: ${port}`);
});
