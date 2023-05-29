// Third-party dependencies
import sgMail from "@sendgrid/mail"
import type { NextApiRequest, NextApiResponse } from "next"
import { HydratedDocument } from "mongoose"

// Current project dependencies
import User from "@/models/User"
import connectWithRetry from "@/database"
import httpStatus from "@/constants/common/httpStatus"
import { IUser } from "@/ts/interfaces/user"
import apiMessages from "@/constants/api/messages"
import { generateJWT, validateSimpleEmail } from "@/utils/basic"

const forgotPassword = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email = "" } = req.body

    if (!email) {
      return res.status(httpStatus.badRequest.code).json({
        message: apiMessages.errors.common.requiredFields,
      })
    }

    if (!validateSimpleEmail(email)) {
      return res.status(httpStatus.badRequest.code).json({
        message: apiMessages.errors.authentication.invalidEmail,
      })
    }

    await connectWithRetry()

    const user: HydratedDocument<IUser> | null = await User.findOne({ email })

    if (user) {
      const payload = {
        id: user.id,
        email: user.email,
      }

      const token = await generateJWT(payload, "10m")

      sgMail.setApiKey(process.env.SENDGRID_API_KEY || "")

      const resetLink = `https://nikafeis.web.app/reset-password?token=${token}`
      const subject = `Reset your password, ${user.firstname} ${user.lastname}`

      const msg = {
        to: user.email,
        from: process.env.SENDGRID_VERIFIED_SENDER_IDENTITY || "",
        subject,
        text: "You have requested to reset your password. Please follow the link below to reset your password:",
        html: `<button href="${resetLink}">Click here</button>`,
      }

      console.log(
        "🚀 ~ file: forgotPassword.ts:55 ~ forgotPassword ~ msg:",
        msg
      )

      // TODO: Fix this part cause the email is not sending to user
      // await sgMail.send(msg)
    }

    return res.status(httpStatus.ok.code).json({
      message: apiMessages.success.user.passwordResetLinkSent,
    })
  } catch (error: any) {
    res.status(httpStatus.serverError.code).json({
      message: httpStatus.serverError.message,
    })
  }
}

export default forgotPassword
