const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');


// Template website link
// https://moosend.com/templates/welcome/



const mailTransporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service: 'gmail',
    port: '587',
    // secure:'true', 
    auth: {
        user: process.env.MAIL,
        pass: process.env.PSWD
    }
});



mailTransporter.verify((error, success) => {
    if (error) console.log(error);
    console.log("Server is ready to take our messages");
});

mailTransporter.use('compile', hbs({
    viewEngine: {
        extname: '.hbs',
        defaultLayout: false,
    }, viewPath: './mailer/templates/', extName: '.hbs'
}));


module.exports = mailTransporter;