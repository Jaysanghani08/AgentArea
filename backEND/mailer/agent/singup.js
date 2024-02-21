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
        // layoutsDir: './mailer/',
        defaultLayout: false,
        // partialsDir: './mailer/',
    }, viewPath: './mailer/agent/', extName: '.hbs'
}));


const test = async (req, res) => {


    let mailDetails = {
        from: 'Insure Area',
        to: "shubhampatel12233@gmail.com",
        subject: 'Test Email',
        template: 'test'
    };

    const s = await mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
            console.log('Error Occurs');
            console.log(err);
        } else {
            console.log('Email sent successfully');
        }
    });
}

module.exports = test;