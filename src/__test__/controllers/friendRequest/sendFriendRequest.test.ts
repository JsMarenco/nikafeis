// Third-party dependencies
import mongoose from "mongoose"

// Current project dependencies
import apiMessages from "@/constants/api/messages"
import httpStatus from "@/constants/common/httpStatus"
import apiRoutes from "@/constants/api/routes"
import testClient from "@/utils/test/testClient"
import { IUserTokenPayload } from "@/ts/interfaces/user"
import { emptyDatabase } from "@/database"
import { documentId, testMessage, wrongId } from "@/utils/test"
import sendFriendRequestHandler from "@/pages/api/friend-requests/send"
import {
  generateFakeUsers,
  uploadFakeUsersToDB,
} from "@/utils/test/generate/users"
import { generateJWT } from "@/utils/basic"

const { errors, success } = apiMessages

// Clients
let client = testClient(sendFriendRequestHandler)

let senderUserInfo: any
let receiverUserInfo: any

beforeEach(async () => {
  await emptyDatabase()

  const usersFake = generateFakeUsers(5)
  const usersUploaded: any = await uploadFakeUsersToDB(usersFake)

  let senderUserTokenPayload: IUserTokenPayload = {
    id: usersUploaded[0]._id,
    email: usersUploaded[0].email,
  }
  let receiverUserTokenPayload: IUserTokenPayload = {
    id: usersUploaded[1]._id,
    email: usersUploaded[1].email,
  }

  const senderAccessToken = await generateJWT(senderUserTokenPayload, "7d")
  const receiverAccessToken = await generateJWT(receiverUserTokenPayload, "7d")

  senderUserInfo = {
    ...usersUploaded[0]._doc,
    accessToken: senderAccessToken,
  }

  receiverUserInfo = {
    ...usersUploaded[1]._doc,
    accessToken: receiverAccessToken,
  }
})

afterAll(async () => {
  await mongoose.disconnect()
})

describe("/api/friend-requests/send", () => {
  test(testMessage(success.friendRequest.sent), async () => {
    const headers = { authorization: `Bearer ${senderUserInfo.accessToken}` }
    const query = {
      senderId: senderUserInfo._id,
      receiverId: receiverUserInfo._id,
    }
    client = testClient(sendFriendRequestHandler, query, headers)

    await client
      .post(
        apiRoutes.friendRequest.send(senderUserInfo.id, receiverUserInfo.id)
      )
      .expect(httpStatus.created.code)
      .expect("Content-Type", /application\/json/)
      .expect((res) => {
        expect(JSON.parse(res.text).message).toEqual(success.friendRequest.sent)
        expect(JSON.parse(res.text).friendRequestsSent).toHaveLength(
          senderUserInfo.friendRequestsSent.length + 1
        )
      })
  })

  test(testMessage(errors.common.requiredFields), async () => {
    const headers = { authorization: `Bearer ${senderUserInfo.accessToken}` }
    const query = {
      senderId: senderUserInfo._id,
      receiverId: "",
    }
    client = testClient(sendFriendRequestHandler, query, headers)

    await client
      .post(
        apiRoutes.friendRequest.send(senderUserInfo.id, receiverUserInfo.id)
      )
      .expect(httpStatus.badRequest.code)
      .expect("Content-Type", /application\/json/)
      .expect((res) => {
        expect(JSON.parse(res.text).message).toEqual(
          errors.common.requiredFields
        )
      })
  })

  test(testMessage(errors.friendRequest.selfFriendRequest), async () => {
    const headers = { authorization: `Bearer ${senderUserInfo.accessToken}` }
    const query = {
      senderId: senderUserInfo._id,
      receiverId: senderUserInfo._id,
    }
    client = testClient(sendFriendRequestHandler, query, headers)

    await client
      .post(
        apiRoutes.friendRequest.send(senderUserInfo.id, receiverUserInfo.id)
      )
      .expect(httpStatus.badRequest.code)
      .expect("Content-Type", /application\/json/)
      .expect((res) => {
        expect(JSON.parse(res.text).message).toEqual(
          errors.friendRequest.selfFriendRequest
        )
      })
  })

  test(testMessage(errors.user.userNotFound), async () => {
    const headers = { authorization: `Bearer ${senderUserInfo.accessToken}` }
    const query = {
      senderId: senderUserInfo._id,
      receiverId: documentId,
    }
    client = testClient(sendFriendRequestHandler, query, headers)

    await client
      .post(
        apiRoutes.friendRequest.send(senderUserInfo.id, receiverUserInfo.id)
      )
      .expect(httpStatus.notFound.code)
      .expect("Content-Type", /application\/json/)
      .expect((res) => {
        expect(JSON.parse(res.text).message).toEqual(errors.user.userNotFound)
      })
  })

  test(testMessage(errors.friendRequest.requestAlreadySent), async () => {
    const headers = { authorization: `Bearer ${senderUserInfo.accessToken}` }
    const query = {
      senderId: senderUserInfo._id,
      receiverId: receiverUserInfo._id,
    }
    client = testClient(sendFriendRequestHandler, query, headers)

    await client
      .post(
        apiRoutes.friendRequest.send(senderUserInfo.id, receiverUserInfo.id)
      )
      .expect(httpStatus.created.code)
      .expect("Content-Type", /application\/json/)
      .expect((res) => {
        expect(JSON.parse(res.text).message).toEqual(success.friendRequest.sent)
        expect(JSON.parse(res.text).friendRequestsSent).toHaveLength(
          senderUserInfo.friendRequestsSent.length + 1
        )
      })

    await client
      .post(
        apiRoutes.friendRequest.send(senderUserInfo.id, receiverUserInfo.id)
      )
      .expect(httpStatus.badRequest.code)
      .expect("Content-Type", /application\/json/)
      .expect((res) => {
        expect(JSON.parse(res.text).message).toEqual(
          errors.friendRequest.requestAlreadySent
        )
      })
  })

  test(testMessage(errors.authentication.invalidId), async () => {
    const headers = { authorization: `Bearer ${senderUserInfo.accessToken}` }
    const query = {
      senderId: senderUserInfo._id,
      receiverId: wrongId,
    }
    client = testClient(sendFriendRequestHandler, query, headers)

    await client
      .post(
        apiRoutes.friendRequest.send(senderUserInfo.id, receiverUserInfo.id)
      )
      .expect(httpStatus.badRequest.code)
      .expect("Content-Type", /application\/json/)
      .expect((res) => {
        expect(JSON.parse(res.text).message).toEqual(
          errors.authentication.invalidId
        )
      })
  })
})
