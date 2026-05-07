import nodemailer from 'nodemailer';

export const sendMail = async (to, subject, text, html) => {

    try {


        const trasporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "sumedhzodape143@gmail.com",
                pass: "npdo wmzu anqw zchq"
            }
        })
        console.log("dfsdfd")

        const mailOptions = {
            from: 'sumedhzodape143@gmail.com',
            to,
            subject,
            text,
            html
        }

        const info = await trasporter.sendMail(mailOptions)
    }


    catch (error) {
        console.log(error)
    }

}