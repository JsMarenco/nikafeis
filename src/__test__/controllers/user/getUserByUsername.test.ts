// Third-party dependencies
import mongoose from "mongoose"

// Current project dependencies
import apiMessages from "@/constants/api/messages"
import httpStatus from "@/constants/common/httpStatus"
import apiRoutes from "@/constants/api/routes"
import testClient from "@/utils/test/testClient"
import { emptyDatabase } from "@/database"
import { testMessage } from "@/utils/test"
import { IRegisterUser, IUser } from "@/ts/interfaces/user"
import { generateFakeUser } from "@/utils/test/generate/users"
import { uploadFakeUsersToDB } from "@/utils/test/generate/users"
import getUserByUsernameHandler from "@/pages/api/users/username/[username]"

const { errors } = apiMessages

let userLoggedInfo: IUser

beforeEach(async () => {
  await emptyDatabase()

  const fakeUser: IRegisterUser = generateFakeUser()
  const users: IUser[] = await uploadFakeUsersToDB([fakeUser])
  userLoggedInfo = users[0]
})

afterAll(async () => {
  mongoose.disconnect()
})

describe("/api/users/username", () => {
  test(testMessage("A user successfuly"), async () => {
    const client = testClient(getUserByUsernameHandler, {
      username: userLoggedInfo.username,
    })

    await client
      .get(apiRoutes.user.getUserByUsername(userLoggedInfo.username))
      .expect(httpStatus.ok.code)
      .expect("Content-Type", /application\/json/)
      .expect((res) => {
        expect(JSON.parse(res.text).lastname).toEqual(userLoggedInfo.lastname)
      })
  })

  test(testMessage(errors.common.requiredFields), async () => {
    const client = testClient(getUserByUsernameHandler, { username: "" })

    await client
      .get(apiRoutes.user.getUserByUsername(""))
      .expect(httpStatus.badRequest.code)
      .expect("Content-Type", /application\/json/)
      .expect((res) => {
        expect(JSON.parse(res.text).message).toEqual(
          errors.common.requiredFields
        )
      })
  })

  test(testMessage(errors.user.userNotFound), async () => {
    const client = testClient(getUserByUsernameHandler, { username: "user" })

    await client
      .get(apiRoutes.user.getUserByUsername("user"))
      .expect(httpStatus.notFound.code)
      .expect("Content-Type", /application\/json/)
      .expect((res) => {
        expect(JSON.parse(res.text).message).toEqual(errors.user.userNotFound)
      })
  })

  test(testMessage(httpStatus.methodNotAllowed.message), async () => {
    const client = testClient(getUserByUsernameHandler, {
      username: userLoggedInfo.username,
    })

    await client
      .post(apiRoutes.user.getUserByUsername("user"))
      .expect(httpStatus.methodNotAllowed.code)
      .expect("Content-Type", /application\/json/)
      .expect((res) => {
        expect(JSON.parse(res.text).message).toEqual(
          httpStatus.methodNotAllowed.message
        )
      })
  })
})
