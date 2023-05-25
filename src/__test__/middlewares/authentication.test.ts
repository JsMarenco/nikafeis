// Third-party dependencies

// Current project dependencies
import apiMessages from "@/constants/api/messages"
import httpStatus from "@/constants/common/httpStatus"
import registerHandler from "@/pages/api/users"
import apiRoutes from "@/constants/api/routes"
import testClient from "@/utils/test/testClient"
import {
  ILoginUser,
  IRegisterUser,
  IUser,
  IUserTokenPayload,
} from "@/ts/interfaces/user"
import { emptyDatabase } from "@/database"
import {
  documentId,
  loginUserPayload,
  registerUserPayload,
  testMessage,
  wrongId,
} from "@/utils/test"
import loginHandler from "@/pages/api/users/login"
import authentication from "@/middlewares/authentication"
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import { generateJWT } from "@/utils/basic"

const { errors, success } = apiMessages

// Clients
let registerClient = testClient(registerHandler)
let loginClient = testClient(loginHandler)

let registerUserPL: IRegisterUser
let loginUserPL: ILoginUser

let userLoggedInfo: IUser

beforeEach(async () => {
  registerUserPL = registerUserPayload
  loginUserPL = loginUserPayload

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

describe("Authentication middleware", () => {
  test("Should execute the handler", async () => {
    // Mock the request and response objects
    const req = {
      headers: {
        authorization: `Bearer ${userLoggedInfo.accessToken}`,
      },
    } as unknown as NextApiRequest

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as NextApiResponse

    // Mock the next handler
    const nextHandler = jest.fn() as NextApiHandler

    await authentication(req, res, nextHandler)

    expect(nextHandler).toBeCalled()
  })

  test(testMessage(errors.authentication.tokenRequired), async () => {
    const req = {
      headers: {},
    } as unknown as NextApiRequest

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as NextApiResponse

    const nextHandler = jest.fn() as NextApiHandler

    await authentication(req, res, nextHandler)

    expect(nextHandler).toBeCalledTimes(0)
    expect(res.status).toBeCalledWith(httpStatus.badRequest.code)
    expect(res.json).toBeCalledWith({
      message: errors.authentication.tokenRequired,
    })
  })

  test(testMessage(errors.user.userNotFound), async () => {
    const tokenPayload: IUserTokenPayload = {
      email: "test@gmail.com",
      id: documentId,
    }

    const tokenWithWrongId = await generateJWT(tokenPayload, "7d")

    const req = {
      headers: {
        authorization: `Bearer ${tokenWithWrongId}`,
      },
    } as unknown as NextApiRequest

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as NextApiResponse

    const nextHandler = jest.fn() as NextApiHandler

    await authentication(req, res, nextHandler)

    expect(nextHandler).toBeCalledTimes(0)
    expect(res.status).toBeCalledWith(httpStatus.notFound.code)
    expect(res.json).toBeCalledWith({
      message: errors.user.userNotFound,
    })
  })

  test(testMessage(errors.authentication.invalidToken), async () => {
    const req = {
      headers: {
        authorization: "Bearer my_token",
      },
    } as unknown as NextApiRequest

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as NextApiResponse

    const nextHandler = jest.fn() as NextApiHandler

    await authentication(req, res, nextHandler)

    expect(nextHandler).toBeCalledTimes(0)
    expect(res.status).toBeCalledWith(httpStatus.badRequest.code)
    expect(res.json).toBeCalledWith({
      message: errors.authentication.invalidToken,
    })
  })

  test(testMessage(errors.authentication.invalidId), async () => {
    const tokenPayload: IUserTokenPayload = {
      email: "test@gmail.com",
      id: wrongId,
    }

    const tokenWithWrongId = await generateJWT(tokenPayload, "7d")

    const req = {
      headers: {
        authorization: `Bearer ${tokenWithWrongId}`,
      },
    } as unknown as NextApiRequest

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as NextApiResponse

    const nextHandler = jest.fn() as NextApiHandler

    await authentication(req, res, nextHandler)

    expect(nextHandler).toBeCalledTimes(0)
    expect(res.status).toBeCalledWith(httpStatus.badRequest.code)
    expect(res.json).toBeCalledWith({
      message: errors.authentication.invalidId,
    })
  })

  test(testMessage(errors.authentication.jwtExpired), async () => {
    const tokenPayload: IUserTokenPayload = {
      email: "test@gmail.com",
      id: userLoggedInfo.id,
    }

    const tokenWithWrongId = await generateJWT(tokenPayload, "-1")

    const req = {
      headers: {
        authorization: `Bearer ${tokenWithWrongId}`,
      },
    } as unknown as NextApiRequest

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as NextApiResponse

    const nextHandler = jest.fn() as NextApiHandler

    await authentication(req, res, nextHandler)

    expect(nextHandler).toBeCalledTimes(0)
    expect(res.status).toBeCalledWith(httpStatus.badRequest.code)
    expect(res.json).toBeCalledWith({
      message: errors.authentication.jwtExpired,
    })
  })
})
