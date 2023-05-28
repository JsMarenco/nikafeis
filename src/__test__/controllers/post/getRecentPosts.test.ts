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
import recentPostsHandler from "@/pages/api/posts/recent"
import {
  generateFakeUsers,
  uploadFakeUsersToDB,
} from "@/utils/test/generate/users"
import { ICreatePost } from "@/ts/interfaces/post"
import {
  generateFakePosts,
  uploadFakePostsToDB,
} from "@/utils/test/generate/posts"

const { errors } = apiMessages

// Clients

beforeEach(async () => {
  await emptyDatabase()

  const documentLimit = 30

  const usersFake: IRegisterUser[] = generateFakeUsers(documentLimit)
  const postsFake: ICreatePost[] = generateFakePosts(documentLimit)

  const usersUploaded: IUser[] = await uploadFakeUsersToDB(usersFake)
  await uploadFakePostsToDB(postsFake, usersUploaded)
})

afterAll(async () => {
  mongoose.disconnect()
})

describe("/api/posts/recent", () => {
  test(testMessage("An array of posts"), async () => {
    const query = { offset: 0, limit: 5 }
    const client = testClient(recentPostsHandler, query)

    await client
      .get(apiRoutes.post.getRecentPosts(query.offset, query.limit))
      .expect(httpStatus.ok.code)
      .expect("Content-Type", /application\/json/)
      .expect((res) => {
        expect(JSON.parse(res.text).posts).toHaveLength(query.limit)
        expect(JSON.parse(res.text).hasNextPage).toBeTruthy()
      })
  })

  test(testMessage(errors.common.limitOffset), async () => {
    const query = { offset: "", limit: "" }
    const client = testClient(recentPostsHandler, query)

    await client
      .get(apiRoutes.post.getRecentPosts(0, 0))
      .expect(httpStatus.badRequest.code)
      .expect("Content-Type", /application\/json/)
      .expect((res) => {
        expect(JSON.parse(res.text).message).toEqual(errors.common.limitOffset)
      })
  })

  test(testMessage(errors.common.offsetMustBeNumber), async () => {
    const query = { offset: "test", limit: 5 }
    const client = testClient(recentPostsHandler, query)

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
    const query = { offset: 0, limit: "test" }
    const client = testClient(recentPostsHandler, query)

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
})
