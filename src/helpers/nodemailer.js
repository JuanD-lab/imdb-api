const nodemailer = require("nodemailer");
const googleapis = require("googleapis");
require("dotenv").config();
const hbs = require('nodemailer-express-handlebars')
const path = require('path');

const Oauth2 = googleapis.google.auth.OAuth2;

const createTransporter = async () => {
    const oauthClient = new Oauth2(
        process.env.G_ID_CLIENT,
        process.env.G_SECRET_CLIENT,
        "https://developers.google.com/oauthplayground"
    );
    oauthClient.setCredentials({ refresh_token: process.env.G_REFRESH_TOKEN });

    try {
        const accessToken = await oauthClient.getAccessToken();
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: process.env.G_USER,
                clientId: process.env.G_ID_CLIENT,
                clientSecret: process.env.G_SECRET_CLIENT,
                refreshToken: process.env.G_REFRESH_TOKEN,
                accessToken: accessToken,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        return transporter
    } catch (error) {
        console.log(error);
    }
};


const sendEmail = async (options) => {
    try {
        const handlebarsOptions = {
            viewEngine: {
                extName: ".handlebars",
                partialsDir: path.resolve('./src/views'),
                defaultLayout: false,
            },
            viewPath: path.resolve('./src/views'),
        };
    
    
        const gmailTransporter = await createTransporter()
        gmailTransporter.use('compile', hbs(handlebarsOptions))
        await gmailTransporter.sendMail(options)
    } catch (error) {
        console.log(error);
    }
}


const emailOptions = {
    subject: "Probando",
    to: "mail@mail.com",
    from: process.env.G_USER
}

module.exports= {
    sendEmail,
    emailOptions
}