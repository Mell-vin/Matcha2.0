const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const jwtGenerator = require('./jwtGenerator');

const mailman = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.gmail_user,
      pass: process.env.gmail_pass
    }
}));

class mailroom {

    static verifyAccount(email)
    {
        const verifytoken = jwtGenerator(email);
        try {
            const url = `http://localhost:3000/verifyme/?token=${verifytoken}`;
            console.log('Prepping email');
            mailman.sendMail({
                to: email,
                subject: 'Verify Matcha Account',
                html:`<h1>Welcome to Matcha</h1><br /><p>Please use this link to verify your email and log in: </p><a href="${url}">Verify Me</a><br /><p>Matcha Team</p>`
        })
        console.log('Email sent');
        } catch (err){
        console.log(err.message);
        }
    }

    static resetPasswordreq(email)
    {
        const verifytoken = jwtGenerator(email);
        try {
            const url = `http://localhost:3000/forgotReset/?token=${verifytoken}`;
            console.log('Prepping email');
            mailman.sendMail({
                to: email,
                subject: 'Reset Password',
                html:`<h1>Welcome to Matcha</h1><br /><p>Please use this link to reset your password: </p><a href="${url}">Reset Password</a><br /><p>Matcha Team</p>`
            })
            console.log('Email sent');
            } catch (err){
            console.log(err.message);
            }
    }
}
module.exports = { mailroom };