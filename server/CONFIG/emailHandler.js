const nodemailer = require('nodemailer');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');

const {SEND_GRIP_API_KEY} = process.env;
const formatEmail = async (content,creds)=>{
    const arrCreds = Object.keys(creds);
    arrCreds.forEach((key)=>{
        content = content.replaceAll(`#{${key}}`,creds[key]);
    })
    return content;
}

const emailHandler = async (templateName, receiverEmail, creds)=>{
    try{
        const templatePath = path.join(__dirname,templateName);
        let content = await fs.promises.readFile(templatePath,"utf-8");
        const mailBody = await formatEmail(content,creds);
        const emailDetails = {
            to: receiverEmail,
            from: 'avinbabuk12@gmail.com',
            html: mailBody
        }
        if(templateName === 'OTP.html'){
            emailDetails['subject'] = 'Your OTP for resetting bookMYshow Password';
            emailDetails['text'] = `Dear ${creds.name},
Please enter below OTP to reset your bookMYshow account password.
${creds.otp}
Note: This OTP is valid for the next 1 hours only.

If you didn't generate this OTP, don't worry your account is absolutely safe. It could have happened because someone has entered your email Id by mistake while resetting his/her bookMYshow password.

Do not share this OTP with anyone.
Regards
bookMYshow Team`
        }
        if(templateName === 'ticket.html'){
            emailDetails['subject'] = 'Your  Tickets';
            emailDetails['text'] = 'Your booking is confirmed!'
        }

        const transportDetails = {
            host : 'smtp.sendgrid.net',
            port: 465,
            auth: {
                user: 'apikey',
                pass: SEND_GRIP_API_KEY
            }
        }

        const transporter = nodemailer.createTransport(transportDetails);
        await transporter.sendMail(emailDetails);
        console.log("email has sent");
    }
    catch(err){
        console.log("Error from email handler:", err);
    }
}

module.exports = emailHandler;