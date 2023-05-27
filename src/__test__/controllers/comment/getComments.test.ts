// Third-party dependencies

// Current project dependencies
import apiMessages from "@/constants/api/messages"
import httpStatus from "@/constants/common/httpStatus"
import apiRoutes from "@/constants/api/routes"
import testClient from "@/utils/test/testClient"
import { IRegisterUser, IUser } from "@/ts/interfaces/user"
import { emptyDatabase } from "@/database"
import { documentId, testMessage, wrongId } from "@/utils/test"
import {
  generateFakeUsers,
  uploadFakeUsersToDB,
} from "@/utils/test/generate/users"
import { ICreatePost, IPost } from "@/ts/interfaces/post"
import {
  generateFakePosts,
  uploadFakePostsToDB,
} from "@/utils/test/generate/posts"
import { ICreateComment } from "@/ts/interfaces/comment"
import {
  addCommentsToPost,
  generateFakeComments,
} from "@/utils/test/generate/comments"
import getCommentsHandler from "@/pages/api/comments/list"

const { errors } = apiMessages

// Clients
let postWithComments: IPost

beforeEach(async () => {
  await emptyDatabase()

  const documentLimit = 30

  const usersFake: IRegisterUser[] = generateFakeUsers(documentLimit)
  const postsFake: ICreatePost[] = generateFakePosts(documentLimit)
  const commentsFake: ICreateComment[] = generateFakeComments(documentLimit)

  const usersUploaded: IUser[] = await uploadFakeUsersToDB(usersFake)
  const postsUploaded: IPost[] = await uploadFakePostsToDB(
    postsFake,
    usersUploaded
  )
  postWithComments = await addCommentsToPost(
    postsUploaded[0],
    usersUploaded,
    commentsFake
  )
})

describe("/api/comments/list", () => {
  test(testMessage("An array of posts"), async () => {
    const query = { offset: 0, limit: 5, postId: postWithComments.id }
    const client = testClient(getCommentsHandler, query)

    await client
      .get(apiRoutes.post.getRecentPosts(query.offset, query.limit))
      .expect(httpStatus.ok.code)
      .expect("Content-Type", /application\/json/)
      .expect((res) => {
        expect(res.body).toHaveLength(query.limit)
      })
  })

  test(testMessage(httpStatus.methodNotAllowed.message), async () => {
    const query = { offset: 0, limit: 5, postId: postWithComments.id }
    const client = testClient(getCommentsHandler, query)

    await client
      .post(apiRoutes.post.getRecentPosts(query.offset, query.limit))
      .expect(httpStatus.methodNotAllowed.code)
      .expect("Content-Type", /application\/json/)
      .expect((res) => {
        expect(JSON.parse(res.text).message).toEqual(
          httpStatus.methodNotAllowed.message
        )
      })
  })

  test(testMessage(errors.common.requiredFields), async () => {
    const query = { offset: 0, limit: 5, postId: "" }
    const client = testClient(getCommentsHandler, query)

    await client
      .get(apiRoutes.post.getRecentPosts(query.offset, query.limit))
      .expect(httpStatus.badRequest.code)
      .expect("Content-Type", /application\/json/)
      .expect((res) => {
        expect(JSON.parse(res.text).message).toEqual(
          errors.common.requiredFields
        )
      })
  })

  test(testMessage(errors.common.limitOffset), async () => {
    const query = { offset: "", limit: "", postId: postWithComments.id }
    const client = testClient(getCommentsHandler, query)

    await client
      .get(apiRoutes.post.getRecentPosts(0, 0))
      .expect(httpStatus.badRequest.code)
      .expect("Content-Type", /application\/json/)
      .expect((res) => {
        expect(JSON.parse(res.text).message).toEqual(errors.common.limitOffset)
      })
  })

  test(testMessage(errors.common.offsetMustBeNumber), async () => {
    const query = { offset: "test", limit: 5, postId: postWithComments.id }
    const client = testClient(getCommentsHandler, query)

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
    const query = { offset: 0, limit: "test", postId: postWithComments.id }
    const client = testClient(getCommentsHandler, query)

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

  test(testMessage(errors.post.postNotFound), async () => {
    const query = { offset: 0, limit: 5, postId: documentId }
    const client = testClient(getCommentsHandler, query)

    await client
      .get(apiRoutes.post.getRecentPosts(query.offset, 0))
      .expect(httpStatus.notFound.code)
      .expect("Content-Type", /application\/json/)
      .expect((res) => {
        expect(JSON.parse(res.text).message).toEqual(errors.post.postNotFound)
      })
  })

  test(testMessage(errors.authentication.invalidId), async () => {
    const query = { offset: 0, limit: 5, postId: wrongId }
    const client = testClient(getCommentsHandler, query)

    await client
      .get(apiRoutes.post.getRecentPosts(query.offset, 0))
      .expect(httpStatus.badRequest.code)
      .expect("Content-Type", /application\/json/)
      .expect((res) => {
        expect(JSON.parse(res.text).message).toEqual(
          errors.authentication.invalidId
        )
      })
  })
})
