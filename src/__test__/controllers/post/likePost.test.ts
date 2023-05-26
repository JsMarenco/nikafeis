// Third-party dependencies

// Current project dependencies
import apiMessages from "@/constants/api/messages"
import httpStatus from "@/constants/common/httpStatus"
import registerHandler from "@/pages/api/users"
import apiRoutes from "@/constants/api/routes"
import testClient from "@/utils/test/testClient"
import { ILoginUser, IRegisterUser, IUser } from "@/ts/interfaces/user"
import { emptyDatabase } from "@/database"
import {
  createPostPayload,
  documentId,
  loginUserPayload,
  registerUserPayload,
  testMessage,
  wrongId,
} from "@/utils/test"
import loginHandler from "@/pages/api/users/login"
import createPostHandler from "@/pages/api/posts/create"
import { ICreatePost, IPost } from "@/ts/interfaces/post"
import likeHandler from "@/pages/api/posts/like"

const { errors, success } = apiMessages

// Clients
let registerClient = testClient(registerHandler)
let loginClient = testClient(loginHandler)
let createdPostClient = testClient(createPostHandler)
let client = testClient(likeHandler)

let registerUserPL: IRegisterUser
let loginUserPL: ILoginUser
let createPostPL: ICreatePost

let userLoggedInfo: IUser
let postCreatedInfo: IPost

beforeEach(async () => {
  registerUserPL = registerUserPayload
  loginUserPL = loginUserPayload
  createPostPL = createPostPayload

  await emptyDatabase()

  registerClient = testClient(registerHandler)
  loginClient = testClient(loginHandler)

  // Register user
  await registerClient
    .post(apiRoutes.user.register)
    .send(registerUserPL)
    .expect(httpStatus.created.code)
    .expect("Content-Type", /application\/json/)
    .expect((res) => {
      expect(JSON.parse(res.text).message).toEqual(success.user.created)
    })

  const loginRes = await loginClient
    .post(apiRoutes.user.login)
    .send(loginUserPL)
    .expect(httpStatus.ok.code)
    .expect("Content-Type", /application\/json/)
    .expect((res) => {
      expect(JSON.parse(res.text).message).toEqual(success.authentication.login)
    })

  userLoggedInfo = {
    ...loginRes.body.user,
    accessToken: loginRes.body.accessToken,
  }

  const headers = { authorization: `Bearer ${userLoggedInfo.accessToken}` }
  createdPostClient = testClient(
    createPostHandler,
    { userId: userLoggedInfo.id },
    headers
  )

  const postRes = await createdPostClient
    .post(apiRoutes.post.create(userLoggedInfo.id))
    .send(createPostPL)
    .expect(httpStatus.created.code)
    .expect("Content-Type", /application\/json/)
    .expect((res) => {
      expect(JSON.parse(res.text).message).toEqual(success.post.created)
    })

  postCreatedInfo = postRes.body.post
})

describe("/api/posts/like", () => {
  test(testMessage(success.post.liked), async () => {
    const headers = { authorization: `Bearer ${userLoggedInfo.accessToken}` }
    const query = { postId: postCreatedInfo.id, userId: userLoggedInfo.id }
    client = testClient(likeHandler, query, headers)

    await client
      .put(apiRoutes.post.like(postCreatedInfo.id, userLoggedInfo.id))
      .expect(httpStatus.ok.code)
      .expect("Content-Type", /application\/json/)
      .expect((res) => {
        expect(JSON.parse(res.text).message).toEqual(success.post.liked)

        const expectedLength = postCreatedInfo.likes.length + 1

        expect(JSON.parse(res.text).post.likes).toHaveLength(expectedLength)
      })
  })

  test(testMessage(success.post.unliked), async () => {
    const headers = { authorization: `Bearer ${userLoggedInfo.accessToken}` }
    const query = { postId: postCreatedInfo.id, userId: userLoggedInfo.id }
    client = testClient(likeHandler, query, headers)

    const res = await client
      .put(apiRoutes.post.like(postCreatedInfo.id, userLoggedInfo.id))
      .expect(httpStatus.ok.code)
      .expect("Content-Type", /application\/json/)
      .expect((res) => {
        expect(JSON.parse(res.text).message).toEqual(success.post.liked)

        const expectedLength = postCreatedInfo.likes.length + 1

        expect(JSON.parse(res.text).post.likes).toHaveLength(expectedLength)
      })

    postCreatedInfo = JSON.parse(res.text).post

    await client
      .put(apiRoutes.post.like(postCreatedInfo.id, userLoggedInfo.id))
      .expect(httpStatus.ok.code)
      .expect("Content-Type", /application\/json/)
      .expect((res) => {
        expect(JSON.parse(res.text).message).toEqual(success.post.unliked)

        const expectedLength = postCreatedInfo.likes.length - 1

        expect(JSON.parse(res.text).post.likes).toHaveLength(expectedLength)
      })
  })

  test(testMessage(errors.common.requiredFields), async () => {
    const headers = { authorization: `Bearer ${userLoggedInfo.accessToken}` }
    const query = { postId: postCreatedInfo.id, userId: "" }
    client = testClient(likeHandler, query, headers)

    await client
      .put(apiRoutes.post.like(postCreatedInfo.id, ""))
      .expect(httpStatus.badRequest.code)
      .expect("Content-Type", /application\/json/)
      .expect((res) => {
        expect(JSON.parse(res.text).message).toEqual(
          errors.common.requiredFields
        )
      })
  })

  test(testMessage(errors.post.postNotFound), async () => {
    const headers = { authorization: `Bearer ${userLoggedInfo.accessToken}` }
    const query = { postId: documentId, userId: userLoggedInfo.id }
    client = testClient(likeHandler, query, headers)

    await client
      .put(apiRoutes.post.like(documentId, userLoggedInfo.id))
      .expect(httpStatus.notFound.code)
      .expect("Content-Type", /application\/json/)
      .expect((res) => {
        expect(JSON.parse(res.text).message).toEqual(errors.post.postNotFound)
      })
  })

  test(testMessage(errors.user.userNotFound), async () => {
    const headers = { authorization: `Bearer ${userLoggedInfo.accessToken}` }
    const query = { postId: postCreatedInfo.id, userId: documentId }
    client = testClient(likeHandler, query, headers)

    await client
      .put(apiRoutes.post.like(postCreatedInfo.id, documentId))
      .expect(httpStatus.notFound.code)
      .expect("Content-Type", /application\/json/)
      .expect((res) => {
        expect(JSON.parse(res.text).message).toEqual(errors.user.userNotFound)
      })
  })

  test(testMessage(errors.authentication.invalidId), async () => {
    const headers = { authorization: `Bearer ${userLoggedInfo.accessToken}` }
    const query = { postId: postCreatedInfo.id, userId: wrongId }
    client = testClient(likeHandler, query, headers)

    await client
      .put(apiRoutes.post.like(postCreatedInfo.id, wrongId))
      .expect(httpStatus.badRequest.code)
      .expect("Content-Type", /application\/json/)
      .expect((res) => {
        expect(JSON.parse(res.text).message).toEqual(
          errors.authentication.invalidId
        )
      })
  })

  test(testMessage(httpStatus.methodNotAllowed.message), async () => {
    const headers = { authorization: `Bearer ${userLoggedInfo.accessToken}` }
    const query = { postId: postCreatedInfo.id, userId: userLoggedInfo.id }
    client = testClient(likeHandler, query, headers)

    await client
      .get(apiRoutes.post.like(postCreatedInfo.id, userLoggedInfo.id))
      .expect(httpStatus.methodNotAllowed.code)
      .expect("Content-Type", /application\/json/)
      .expect((res) => {
        expect(JSON.parse(res.text).message).toEqual(
          httpStatus.methodNotAllowed.message
        )
      })
  })
})
