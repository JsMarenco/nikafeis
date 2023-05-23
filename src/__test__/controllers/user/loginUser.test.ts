// Third-party dependencies

// Current project dependencies
import apiMessages from "@/constants/api/messages"
import httpStatus from "@/constants/common/httpStatus"
import loginHandler from "@/pages/api/users/login"
import apiRoutes from "@/constants/api/routes"
import testClient from "@/utils/test/testClient"
import { ILoginUser, IRegisterUser } from "@/ts/interfaces/user"
import registerHandler from "@/pages/api/users"
import { emptyDatabase } from "@/database"

const { errors, success } = apiMessages

let fakePayload: ILoginUser = {
  email: "johndoe@example.com",
  password: "password123",
}

beforeEach(async () => {
  await emptyDatabase()

  fakePayload = {
    email: "johndoe@example.com",
    password: "password123",
  }
})

describe("/api/users/login", () => {
  test(`Should throw: "${success.authentication.login}"`, async () => {
    const client = testClient(loginHandler)
    const client2 = testClient(registerHandler)

    let fakePayloadRegister: IRegisterUser = {
      confirmPassword: "password123",
      firstname: "John",
      lastname: "Doe",
      email: "johndoe@example.com",
      password: "password123",
    }

    await client2
      .post(apiRoutes.user.register)
      .send(fakePayloadRegister)
      .expect(httpStatus.created.code)
      .expect("Content-Type", /application\/json/)
      .expect((res) => {
        expect(JSON.parse(res.text).message).toEqual(success.user.created)
      })

    await client
      .post(apiRoutes.user.login)
      .send(fakePayload)
      .expect(httpStatus.ok.code)
      .expect("Content-Type", /application\/json/)
      .expect((res) => {
        expect(JSON.parse(res.text).message).toEqual(
          success.authentication.login
        )
      })
  })

  test(`Should throw: "${errors.authentication.invalidCredentials}"`, async () => {
    const client = testClient(loginHandler)

    await client
      .post(apiRoutes.user.login)
      .send({ email: "test@gmail.com", password: "12345678" })
      .expect(httpStatus.badRequest.code)
      .expect("Content-Type", /application\/json/)
  })

  test(`Should throw: "${httpStatus.methodNotAllowed.code}"`, async () => {
    const client = testClient(loginHandler)

    await client
      .put(apiRoutes.user.login)
      .expect(httpStatus.methodNotAllowed.code)
      .expect("Content-Type", /application\/json/)
      .expect((res) => {
        expect(JSON.parse(res.text).message).toEqual(
          httpStatus.methodNotAllowed.message
        )
      })
  })

  test(`Should throw: "${errors.common.requiredFields}"`, async () => {
    const client = testClient(loginHandler)

    const res = await client
      .post(apiRoutes.user.login)
      .send({ email: "test@gmail.com" })
      .expect(httpStatus.badRequest.code)
      .expect("Content-Type", /application\/json/)

    expect(JSON.parse(res.text).message).toEqual(errors.common.requiredFields)
  })

  test(`Should throw: "${errors.authentication.invalidEmail}"`, async () => {
    const client = testClient(loginHandler)

    const res = await client
      .post(apiRoutes.user.login)
      .send({ email: "qwerty", password: "12345678" })
      .expect(httpStatus.badRequest.code)
      .expect("Content-Type", /application\/json/)

    expect(JSON.parse(res.text).message).toEqual(
      errors.authentication.invalidEmail
    )
  })
})
