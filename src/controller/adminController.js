import LawyerProfileModel from "../models/LawyerProfile.js";
import UserModel from '../models/Users.js'
import { sendMail } from '../utils/mail.js'

export const GetAllLawyers = async (req, res) => {
    try {
        const users = await LawyerProfileModel.find();

        res.status(200).json({ result: users, message: "Fetched Lawyers!" })
    } catch (error) {
        res.status(500).json({ message: "Server Error!" })
    }
}


export const UpdateLawyerStatus = async (req, res) => {
    try {

        console.log("Testing")

        const { status, remark } = req.body;
        const profileId = req.params.profileId;


        // fist findout the lawyer
        const lawyerProfile = await LawyerProfileModel.findById(profileId);
        const user = await UserModel.findById(lawyerProfile.userId)
        lawyerProfile.status = status;
        lawyerProfile.adminRemark = remark;

        status === "APPROVED" ? lawyerProfile.approvedAt = new Date() : null;

        await lawyerProfile.save();

        const subject = `Your request has been ${status}`;
        const plainText = ``
        const htmlTemplate = `
            <!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Request ${status}</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8; padding:20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.05);">
          
          <!-- Header -->
          <tr>
            <td style="background-color:#4f46e5; padding:20px; text-align:center;">
              <h1 style="color:#ffffff; margin:0; font-size:22px;">
                Request ${status}
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px; color:#333333; font-size:15px; line-height:1.6;">
              <p style="margin-top:0;">Hi <strong>${user.name}</strong>,</p>

              <p>
                We’re happy to let you know that your request has been
                <strong style="color:#16a34a;">${status}</strong>.
              </p>

              <p>
                If you have any questions or need further assistance, please feel free to contact the admin team.
              </p>

              <p style="margin-bottom:0;">
                Thanks,<br>
                <strong>Admin Team</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f9fafb; padding:15px; text-align:center; font-size:12px; color:#777777;">
              This is an automated message. Please do not reply.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
        `;
        await sendMail(user.email, subject, plainText, htmlTemplate);

        res.status(200).json({ result: lawyerProfile, message: `Status updated to: ${status}` })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server Error!", error })
    }
}