const nodemailer = require('nodemailer')
require("dotenv").config();


const sendEmailUtility = async (emailTo, emailText, EmailSubject) => {
    let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER_NAME,
    pass: process.env.SMTP_PASSWORD
  }
    });
    let mailOptions = {
        from: 'Hacker<kamrulnew1312@gmail.com>',
        to: emailTo,
        subject: EmailSubject,
        text: emailText
    }
     return  await transporter.sendMail(mailOptions);

}

module.exports= sendEmailUtility