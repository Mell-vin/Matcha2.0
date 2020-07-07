const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const jwtGenerator = require('./jwtGenerator');

const mailroom = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.gmail_user,
      pass: process.env.gmail_pass
    }
}));

function verifyAccount(email) {

    const verifytoken = jwtGenerator(email);
    try {
    const url = `http://localhost:3000/verified/${verifytoken}`;
    console.log('Prepping email');
    mailroom.sendMail({
        to: email,
        subject: 'Verify Matcha Account',
        html:`<h1>Welcome to Matcha</h1><br /><p>Please use this link to verify your email and log in: </p><a href="${url}">${url}</a><br /><p>Matcha Team</p>`
    })
    console.log('Email sent');
    } catch (err){
    console.log(err.message);
    }
}

module.exports = verifyAccount;