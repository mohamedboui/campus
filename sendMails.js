var nodemailer = require('nodemailer');
var fs = require('fs');
var message = fs.readFileSync('emailBody.txt', 'utf8');
var async = require('async');
var universities=require('./emails.json');
var transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: 'bouillis.mohamed@gmail.com',
        pass: process.env.pass
    },
    tls: { rejectUnauthorized: false }
});
function sendMail(mailOptions, callback) {
    console.log(mailOptions)
    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            return callback(console.log(error));
        }
        console.log('Message to %s', mailOptions.to);
        callback();
    });
}
function sendOneMail(university, callback) {
    // setup email data with unicode symbols
    var mailOptions = {
        from: '"Bouillis Mohamed" <bouillis.mohamed@gmail.com>', // sender address
        subject: 'Afficher les détails', // Subject line
    };
    mailOptions.to =university.email;
    mailOptions.text = message;
    setTimeout(function() {
            sendMail(mailOptions, callback);
    }, 1000);
}

function sendAllMails(universities, callback) {
    async.eachSeries(universities, callback, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log('done');
        }
    });
}
sendAllMails(universities,sendOneMail);