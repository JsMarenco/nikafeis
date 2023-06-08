// Third-party dependencies
import type { NextApiRequest, NextApiResponse } from "next"
import bcrypt from "bcrypt"

// Current project dependencies
import httpStatus from "@/constants/common/httpStatus"
import connectWithRetry, { emptyDatabase } from "@/database"
import {
  fakeUsersPassword,
  generateFakeUsers,
} from "@/utils/test/generate/users"
import { IRegisterUser } from "@/ts/interfaces/user"
import { generateUsername } from "@/utils/basic"
import User from "@/models/User"
import { generateFakePosts } from "@/utils/test/generate/posts"
import { ICreatePost } from "@/ts/interfaces/post"
import Post from "@/models/Post"
import FriendRequest from "@/models/FriendRequests"

interface userWithUsername extends Omit<IRegisterUser, "confirmPassword"> {
  username: string
}

interface postWithAuthor extends ICreatePost {
  author: string
  postImages: string[]
}

export default async function healthHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await emptyDatabase()
    await connectWithRetry()

    const LIMIT = 60

    /**
     * ==================================
     * ========= GENERING USERS =========
     * ==================================
     */
    const fakeUsers = generateFakeUsers(LIMIT)

    const passwordHash = await bcrypt.hash(fakeUsersPassword, 10)

    for (let i = 0; i < fakeUsers.length; i++) {
      const userWithUsername: userWithUsername = {
        ...fakeUsers[i],
        username: generateUsername(),
        password: passwordHash,
      }

      await User.create(userWithUsername)
    }

    const users = await User.find({})

    /**
     * ==================================
     * ========= GENERING POSTS =========
     * ==================================
     */
    const fakePosts = generateFakePosts(LIMIT)

    for (let i = 0; i < users.length; i++) {
      const postWithAuthor: postWithAuthor = {
        ...fakePosts[i],
        author: users[i].id,
        postImages: [],
      }

      const createdPost = await Post.create(postWithAuthor)

      users[i].posts.push(createdPost._id)
      await users[i].save()
    }

    /**
     * ====================================
     * ========= UPLOAD ADMIN USER ========
     * ====================================
     */
    const adminFirstname = process.env.ADMIN_FIRSTNAME || ""
    const adminLastname = process.env.ADMIN_LASTNAME || ""
    const adminEmail = process.env.ADMIN_EMAIL || ""
    const adminPassword = process.env.ADMIN_PASSWORD || ""

    const adminPasswordHash = await bcrypt.hash(adminPassword, 10)

    const adminObj: userWithUsername = {
      firstname: adminFirstname,
      lastname: adminLastname,
      email: adminEmail,
      password: adminPasswordHash,
      username: "jsmarenco",
    }

    const admin = await new User(adminObj)

    /**
     * ======================================
     * ========= CREATE ADMIN POSTS =========
     * ======================================
     */
    const adminFakePosts = generateFakePosts(LIMIT * 2)

    for (let i = 0; i < adminFakePosts.length; i++) {
      const postWithAuthor: postWithAuthor = {
        ...fakePosts[i],
        author: admin._id,
        postImages: [],
      }

      const createdPost = await Post.create(postWithAuthor)

      admin.posts.push(createdPost._id)
      await admin.save()
    }

    /**
     * ===============================================
     * ========= CREATE ADMIN FRIEND REQUEST =========
     * ===============================================
     */
    const users2 = await User.find({ _id: { $ne: admin._id } })
      .skip(0)
      .limit(15)

    for (let i = 0; i < users2.length; i++) {
      const request = {
        from: users2[i].id,
        to: admin._id,
      }

      const createdFriendRequest = await FriendRequest.create(request)

      await User.findByIdAndUpdate(users2[i].id, {
        $push: { friendRequestsSent: createdFriendRequest.id },
      })

      await User.findByIdAndUpdate(admin._id, {
        $push: { friendRequests: createdFriendRequest.id },
      })
    }

    res.status(httpStatus.created.code).json({
      message: "Created",
      admin: admin,
    })
  } catch (error) {
    console.log("🚀 ~ file: generate.ts:15 ~ error:", error)
    res.status(httpStatus.serverError.code).json({
      message: httpStatus.serverError.message,
    })
  }
}
