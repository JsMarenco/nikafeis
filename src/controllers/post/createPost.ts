// Third-party dependencies
import type { NextApiRequest, NextApiResponse } from "next"
import { HydratedDocument } from "mongoose"

// Current project dependencies
import httpStatus from "@/constants/common/httpStatus"
import apiMessages from "@/constants/api/messages"
import User from "@/models/User"
import { IUser } from "@/ts/interfaces/user"
import { IPost } from "@/ts/interfaces/post"
import Post from "@/models/Post"

const createPost = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId = "", title = "", content = "" } = req.body

    if (!userId || (!title && !content)) {
      return res.status(httpStatus.badRequest.code).json({
        message: apiMessages.errors.common.requiredFields,
      })
    }

    const user: HydratedDocument<IUser> | null = await User.findById(userId)

    if (!user) {
      return res.status(httpStatus.notFound.code).json({
        message: apiMessages.errors.user.userNotFound,
      })
    }

    // TODO: Add token validation
    // TODO: Add cloudianry

    const newPost: HydratedDocument<IPost> = new Post({
      title,
      content,
      postImages: "",
      author: user.id,
    })

    const postSaved = await newPost.save()

    user.posts = user.posts.concat(postSaved.id)

    await user.save()

    res.status(httpStatus.created.code).json({
      post: newPost,
      message: apiMessages.success.post.created,
    })
  } catch (error: any) {
    switch (error.name) {
      case "CastError":
        res.status(httpStatus.badRequest.code).send({
          message: apiMessages.errors.authentication.invalidId,
        })
        break

      default:
        res.status(httpStatus.serverError.code).json({
          message: httpStatus.serverError.message,
        })
        break
    }
  }
}

export default createPost
