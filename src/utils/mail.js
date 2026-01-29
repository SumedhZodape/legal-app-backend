import nodemailer from 'nodemailer';

export const sendMail = async (to, subject, text, html)=>{

    const trasporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
            user: "sumedhzodape143@gmail.com",
            pass: ""
        }
    })


    const mailOptions = {
        from: 'sumedhzodape143@gmail.com',
        to,
        subject,
        text,
        html
    }

    const info = await trasporter.sendMail(mailOptions)

    console.log(info)
}