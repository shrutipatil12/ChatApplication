/******************************************************************************
 *  Execution       :cmd> node server.js                      
 *  @description    :chat application
 *  @file           :sendM.js
 *  @author         :Shruti
 *  @version        :1.0
 
 ******************************************************************************/

module.exports.mail = (url) => {
  var nodemailer = require('nodemailer');
 
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.email,
      pass: process.env.pass
    }
  });

  var mailOptions = {
    from: 'kelkardipali1@gmail.com',
    to: 'shrutidpatil12@gmail.com',
    subject: 'Link for reset password ',
    text: url
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }

  });

}

