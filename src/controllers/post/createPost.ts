// Third-party dependencies
import { HydratedDocument } from "mongoose"
import { NextApiRequest, NextApiResponse } from "next"

// Current project dependencies
import httpStatus from "@/constants/common/httpStatus"
import apiMessages from "@/constants/api/messages"
import User from "@/models/User"
import { IUser } from "@/ts/interfaces/user"
import { ICreatePost, IPost } from "@/ts/interfaces/post"
import Post from "@/models/Post"
import connectWithRetry from "@/database"

const createPost = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = JSON.parse(JSON.stringify(req.body))
    const { title = "", content = "" }: ICreatePost = data
    const { userId = "" } = req.query

    if (!userId || !title || !content) {
      return res.status(httpStatus.badRequest.code).json({
        message: apiMessages.errors.common.requiredFields,
      })
    }

    await connectWithRetry()

    const user: HydratedDocument<IUser> | null = await User.findById(userId)

    if (!user) {
      return res.status(httpStatus.notFound.code).json({
        message: apiMessages.errors.user.userNotFound,
      })
    }

    // TODO: Add cloudianry

    const newPost: HydratedDocument<IPost> = new Post({
      title,
      content,
      postImages: [],
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
    console.log("🚀 ~ file: createPost.ts:57 ~ createPost ~ error:", error)
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
