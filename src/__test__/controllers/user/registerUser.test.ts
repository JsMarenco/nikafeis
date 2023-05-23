// Third-party dependencies

// Current project dependencies
import apiMessages from "@/constants/api/messages"
import httpStatus from "@/constants/common/httpStatus"
import registerHandler from "@/pages/api/users"
import apiRoutes from "@/constants/api/routes"
import testClient from "@/utils/test/testClient"
import { IRegisterUser } from "@/ts/interfaces/user"
import { emptyDatabase } from "@/database"
import {
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
} from "@/controllers/user/registerUser"

const { errors, success } = apiMessages

let fakePayload: IRegisterUser = {
  confirmPassword: "password123",
  firstname: "John",
  lastname: "Doe",
  email: "johndoe@example.com",
  password: "password123",
}

beforeEach(async () => {
  await emptyDatabase()

  fakePayload = {
    confirmPassword: "password123",
    firstname: "John",
    lastname: "Doe",
    email: "johndoe@example.com",
    password: "password123",
  }
})

describe("/api/users/", () => {
  test(`Should throw: "${success.user.created}"`, async () => {
    const client = testClient(registerHandler)

    await client
      .post(apiRoutes.user.register)
      .send(fakePayload)
      .expect(httpStatus.created.code)
      .expect("Content-Type", /application\/json/)
      .expect((res) => {
        expect(JSON.parse(res.text).message).toEqual(success.user.created)
      })
  })

  test(`Should throw: "${httpStatus.methodNotAllowed.code}"`, async () => {
    const client = testClient(registerHandler)

    await client
      .put(apiRoutes.user.register)
      .expect(httpStatus.methodNotAllowed.code)
      .expect("Content-Type", /application\/json/)
      .expect((res) => {
        expect(JSON.parse(res.text).message).toEqual(
          httpStatus.methodNotAllowed.message
        )
      })
  })

  test(`Should throw: "${errors.common.requiredFields}"`, async () => {
    const client = testClient(registerHandler)
    fakePayload.email = ""

    await client
      .post(apiRoutes.user.register)
      .send(fakePayload)
      .expect(httpStatus.badRequest.code)
      .expect("Content-Type", /application\/json/)
      .expect((res) => {
        expect(JSON.parse(res.text).message).toEqual(
          errors.common.requiredFields
        )
      })
  })

  test(`Should throw: "${errors.password.passwordMinLength(
    MIN_PASSWORD_LENGTH
  )}"`, async () => {
    const client = testClient(registerHandler)
    fakePayload.password = "123"

    await client
      .post(apiRoutes.user.register)
      .send(fakePayload)
      .expect(httpStatus.badRequest.code)
      .expect("Content-Type", /application\/json/)
      .expect((res) => {
        expect(JSON.parse(res.text).message).toEqual(
          errors.password.passwordMinLength(MIN_PASSWORD_LENGTH)
        )
      })
  })

  test(`Should throw: "${errors.password.passwordMaxLength(
    MAX_PASSWORD_LENGTH
  )}"`, async () => {
    const randomCharacters = [...Array(90)]
      .map(() => Math.random().toString(36).charAt(2))
      .join("")

    const client = testClient(registerHandler)
    fakePayload.password = randomCharacters

    await client
      .post(apiRoutes.user.register)
      .send(fakePayload)
      .expect(httpStatus.badRequest.code)
      .expect("Content-Type", /application\/json/)
      .expect((res) => {
        expect(JSON.parse(res.text).message).toEqual(
          errors.password.passwordMaxLength(MAX_PASSWORD_LENGTH)
        )
      })
  })

  test(`Should throw: "${errors.password.passwordsDoNotMatch}"`, async () => {
    const client = testClient(registerHandler)
    fakePayload.password = "1234567890"

    await client
      .post(apiRoutes.user.register)
      .send(fakePayload)
      .expect(httpStatus.badRequest.code)
      .expect("Content-Type", /application\/json/)
      .expect((res) => {
        expect(JSON.parse(res.text).message).toEqual(
          errors.password.passwordsDoNotMatch
        )
      })
  })

  test(`Should throw: "${errors.authentication.invalidEmail}"`, async () => {
    const client = testClient(registerHandler)
    fakePayload.email = "testgmail.com"

    await client
      .post(apiRoutes.user.register)
      .send(fakePayload)
      .expect(httpStatus.badRequest.code)
      .expect("Content-Type", /application\/json/)
      .expect((res) => {
        expect(JSON.parse(res.text).message).toEqual(
          errors.authentication.invalidEmail
        )
      })
  })

  test(`Should throw: "${errors.user.userAlreadyExists}"`, async () => {
    const client = testClient(registerHandler)

    await client
      .post(apiRoutes.user.register)
      .send(fakePayload)
      .expect(httpStatus.created.code)
      .expect("Content-Type", /application\/json/)
      .expect((res) => {
        expect(JSON.parse(res.text).message).toEqual(success.user.created)
      })

    await client
      .post(apiRoutes.user.register)
      .send(fakePayload)
      .expect(httpStatus.badRequest.code)
      .expect("Content-Type", /application\/json/)
      .expect((res) => {
        expect(JSON.parse(res.text).message).toEqual(
          errors.user.userAlreadyExists
        )
      })
  })
})
