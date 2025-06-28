import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();
export async function SendEmail({email,emailType,userId}) {
    try{
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if(emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
            verifyToken:hashedToken,
            verifyTokenExpiry: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
        },);
        }else if(emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
            forgotPasswordToken:hashedToken,
            forgotPasswordTokenExpiry: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
        },);
        }

        // Looking to send emails in production? Check out our Email API/SMTP product!
            const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",   // or **live.smtp.mailtrap.io** if you’re using the new “Email Sending” product
            port: 2525,                         // 587 and 465 also work
            auth: {
                user: process.env.MAILTRAPUSER,   // ← COPY from the “Integration” tab
                pass: process.env.MAILTRAPPASS    // ← COPY from the “Integration” tab
            },
            secure: false,                      // TLS is auto-upgraded; keep this false
            logger: true,                       // <-- these two lines spit
            debug: true                         //     SMTP traffic into your console
});

await transport.verify();             // fails fast if creds/host/port are wrong


            const mailOptions = {
                from:'aayush@gmail.com',
                to:email,
                subject: emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
                html: `<p>Click <a href="${process.env.DOMAIN}/verify?token=${encodeURIComponent(hashedToken)}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}.</p>
                       <p>This link will expire in 24 hours.</p>`,      
            }
            
            // `<p>Click <a href="${process.env.DOMAIN}/verify/${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}.</p>


            const mailResponse = await transport.sendMail(mailOptions);
            return mailResponse;
    }catch(err){
        throw new Error(err.message);
    }
    

}
