const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN } = process.env;

// setup NodeMailer using Google OAuth2 for sending emails
module.exports = {
    mailer: ({email}) => {
        const { OAuth2 } = google.auth;
        const oAuth2Client = new OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, 'https://developers.google.com/oauthplayground');
        oAuth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });
        const accessToken = oAuth2Client.getAccessToken();
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'FantasyNodeMailer@gmail.com',
                clientId: GOOGLE_CLIENT_ID,
                clientSecret: GOOGLE_CLIENT_SECRET,
                refreshToken: GOOGLE_REFRESH_TOKEN,
                accessToken
            }
        });
        const mailOptions = {
            from: 'FantasyNodeMailer@gmail.com',
            to: email,
            subject: 'Password Reset!',
            text: `
            Click on the link below to reset your password: 
            `
        }
        return transport.sendMail(mailOptions)
    }
}
