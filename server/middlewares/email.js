const nodemailer = require('nodemailer');

const transOpt = {
    host: 'localhost',
    port: 587,
    secure: false
}
let transporter = nodemailer.createTransport(transOpt);


const sendMail = (toEmail, subject, text) => {
    var message = {
        from: "admin@website.com",
        to: toEmail,
        subject: subject,
        text: text,
        html: `<p>HTML VERSION: ${text}</p>`
      };
      return new Promise((resolve, reject) => {
          //send mail
          transporter.sendMail(message, (err, info) => {
              if(err) return reject(err);
              else {
                  console.log('Email was sent: '+info.messageId);
                  console.log(info);
                  return resolve(info);
              }
          });
      })
      
}

//make HTML email templates

module.exports = {sendMail, transporter}