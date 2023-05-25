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
  wrongId,
} from "@/utils/test"
import loginHandler from "@/pages/api/users/login"
import createPostHandler from "@/pages/api/posts/create"
import { ICreatePost } from "@/ts/interfaces/post"

const { errors, success } = apiMessages

// Clients
let registerClient = testClient(registerHandler)
let loginClient = testClient(loginHandler)
let client

let registerUserPL: IRegisterUser
let loginUserPL: ILoginUser
let createPostPL: ICreatePost

let userLoggedInfo: IUser

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
})

describe("/api/posts/create", () => {
  test(`Should throw ${success.post.created}`, async () => {
    const headers = { Authorization: `Bearer ${userLoggedInfo.accessToken}` }
    client = testClient(
      createPostHandler,
      { userId: userLoggedInfo.id },
      headers
    )

    await client
      .post(apiRoutes.post.create(userLoggedInfo.id))
      .send(createPostPL)
      .expect(httpStatus.created.code)
      .expect("Content-Type", /application\/json/)
      .expect((res) => {
        expect(JSON.parse(res.text).message).toEqual(success.post.created)
      })
  })

  test(`Should throw ${errors.common.requiredFields}`, async () => {
    const headers = { Authorization: `Bearer ${userLoggedInfo.accessToken}` }
    client = testClient(
      createPostHandler,
      { userId: userLoggedInfo.id },
      headers
    )

    const payload: ICreatePost = { ...createPostPL, content: "" }

    await client
      .post(apiRoutes.post.create(userLoggedInfo.id))
      .send(payload)
      .expect(httpStatus.badRequest.code)
      .expect("Content-Type", /application\/json/)
      .expect((res) => {
        expect(JSON.parse(res.text).message).toEqual(
          errors.common.requiredFields
        )
      })
  })

  test(`Should throw ${httpStatus.methodNotAllowed.message}`, async () => {
    client = testClient(createPostHandler)

    await client
      .get(apiRoutes.post.create(userLoggedInfo.id))
      .expect(httpStatus.methodNotAllowed.code)
      .expect("Content-Type", /application\/json/)
      .expect((res) => {
        expect(JSON.parse(res.text).message).toEqual(
          httpStatus.methodNotAllowed.message
        )
      })
  })

  test(`Should throw ${errors.user.userNotFound}`, async () => {
    const headers = { Authorization: `Bearer ${userLoggedInfo.accessToken}` }
    client = testClient(createPostHandler, { userId: documentId }, headers)

    await client
      .post(apiRoutes.post.create(documentId))
      .send(createPostPL)
      .expect(httpStatus.notFound.code)
      .expect("Content-Type", /application\/json/)
      .expect((res) => {
        expect(JSON.parse(res.text).message).toEqual(errors.user.userNotFound)
      })
  })

  test(`Should throw ${errors.authentication.invalidId}`, async () => {
    const headers = { Authorization: `Bearer ${userLoggedInfo.accessToken}` }
    client = testClient(createPostHandler, { userId: wrongId }, headers)

    await client
      .post(apiRoutes.post.create(wrongId))
      .send(createPostPL)
      .expect(httpStatus.badRequest.code)
      .expect("Content-Type", /application\/json/)
      .expect((res) => {
        expect(JSON.parse(res.text).message).toEqual(
          errors.authentication.invalidId
        )
      })
  })
})
