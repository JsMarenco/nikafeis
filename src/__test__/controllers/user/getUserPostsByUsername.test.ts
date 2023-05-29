// Third-party dependencies
import mongoose from "mongoose"

// Current project dependencies
import apiMessages from "@/constants/api/messages"
import httpStatus from "@/constants/common/httpStatus"
import apiRoutes from "@/constants/api/routes"
import testClient from "@/utils/test/testClient"
import { IRegisterUser, IUser } from "@/ts/interfaces/user"
import { emptyDatabase } from "@/database"
import { testMessage } from "@/utils/test"
import {
  generateFakeUsers,
  uploadFakeUsersToDB,
} from "@/utils/test/generate/users"
import { ICreatePost } from "@/ts/interfaces/post"
import {
  createPostsForUser,
  generateFakePosts,
} from "@/utils/test/generate/posts"
import getUserPostByUsernameHandler from "@/pages/api/users/username/[username]/posts"

const { errors } = apiMessages

let userInfo: any

beforeEach(async () => {
  await emptyDatabase()

  const documentLimit = 30

  const usersFake: IRegisterUser[] = generateFakeUsers(documentLimit)
  const postsFake: ICreatePost[] = generateFakePosts(documentLimit)

  const usersUploaded: IUser[] = await uploadFakeUsersToDB(usersFake)
  await createPostsForUser(usersUploaded[0], postsFake)

  userInfo = usersUploaded[0]
})

afterAll(async () => {
  mongoose.disconnect()
})

describe("/api/users/username/posts", () => {
  test(testMessage("An array of posts"), async () => {
    const query = { offset: 0, limit: 5, username: userInfo.username }
    const client = testClient(getUserPostByUsernameHandler, query)

    await client
      .get(
        apiRoutes.user.getUserPostsByUsername(
          userInfo.username,
          query.offset,
          query.limit
        )
      )
      .expect(httpStatus.ok.code)
      .expect("Content-Type", /application\/json/)
      .expect((res) => {
        expect(JSON.parse(res.text).posts).toHaveLength(query.limit)
        expect(JSON.parse(res.text).hasNextPage).toBeTruthy()
      })
  })

  test(testMessage(errors.common.limitOffset), async () => {
    const query = { offset: "", limit: "", username: userInfo.username }
    const client = testClient(getUserPostByUsernameHandler, query)

    await client
      .get(apiRoutes.user.getUserPostsByUsername(userInfo.username, 0, 0))
      .expect(httpStatus.badRequest.code)
      .expect("Content-Type", /application\/json/)
      .expect((res) => {
        expect(JSON.parse(res.text).message).toEqual(errors.common.limitOffset)
      })
  })

  test(testMessage(errors.common.offsetMustBeNumber), async () => {
    const query = { offset: "test", limit: 5, username: userInfo.username }
    const client = testClient(getUserPostByUsernameHandler, query)

    await client
      .get(apiRoutes.post.getRecentPosts(832982398, query.limit))
      .expect(httpStatus.badRequest.code)
      .expect("Content-Type", /application\/json/)
      .expect((res) => {
        expect(JSON.parse(res.text).message).toEqual(
          errors.common.offsetMustBeNumber
        )
      })
  })

  test(testMessage(errors.common.limitMustBeNumber), async () => {
    const query = { offset: 0, limit: "test", username: userInfo.username }
    const client = testClient(getUserPostByUsernameHandler, query)

    await client
      .get(apiRoutes.post.getRecentPosts(query.offset, 0))
      .expect(httpStatus.badRequest.code)
      .expect("Content-Type", /application\/json/)
      .expect((res) => {
        expect(JSON.parse(res.text).message).toEqual(
          errors.common.limitMustBeNumber
        )
      })
  })

  test(testMessage(httpStatus.methodNotAllowed.message), async () => {
    const query = { offset: 0, limit: 5, username: userInfo.username }
    const client = testClient(getUserPostByUsernameHandler, query)

    await client
      .post(apiRoutes.post.getRecentPosts(query.offset, 0))
      .expect(httpStatus.methodNotAllowed.code)
      .expect("Content-Type", /application\/json/)
      .expect((res) => {
        expect(JSON.parse(res.text).message).toEqual(
          httpStatus.methodNotAllowed.message
        )
      })
  })

  test(testMessage(errors.common.requiredFields), async () => {
    const query = { offset: 0, limit: 5, username: "" }
    const client = testClient(getUserPostByUsernameHandler, query)

    await client
      .get(apiRoutes.post.getRecentPosts(query.offset, 0))
      .expect(httpStatus.badRequest.code)
      .expect("Content-Type", /application\/json/)
      .expect((res) => {
        expect(JSON.parse(res.text).message).toEqual(
          errors.common.requiredFields
        )
      })
  })
})
