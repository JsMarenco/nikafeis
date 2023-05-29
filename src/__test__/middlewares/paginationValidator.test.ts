// Third-party dependencies
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next"

// Current project dependencies
import paginationValidator from "@/middlewares/paginationValidator"
import { testMessage } from "@/utils/test"
import apiMessages from "@/constants/api/messages"
import httpStatus from "@/constants/common/httpStatus"

const { errors } = apiMessages

describe("Pagination validator middleware", () => {
  test(testMessage("Execute the handler"), async () => {
    // Mock the request and response objects
    const req = {
      query: {
        offset: 0,
        limit: 5,
      },
    } as unknown as NextApiRequest

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as NextApiResponse

    // Mock the next handler
    const nextHandler = jest.fn() as NextApiHandler

    await paginationValidator(req, res, nextHandler)

    expect(nextHandler).toBeCalled()
  })

  test(testMessage(errors.common.limitOffset), async () => {
    // Mock the request and response objects
    const req = {
      query: {
        offset: "",
        limit: "",
      },
    } as unknown as NextApiRequest

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as NextApiResponse

    // Mock the next handler
    const nextHandler = jest.fn() as NextApiHandler

    await paginationValidator(req, res, nextHandler)

    expect(nextHandler).toBeCalledTimes(0)
    expect(res.status).toBeCalledWith(httpStatus.badRequest.code)
    expect(res.json).toBeCalledWith({
      message: errors.common.limitOffset,
    })
  })

  test(testMessage(errors.common.offsetMustBeNumber), async () => {
    // Mock the request and response objects
    const req = {
      query: {
        offset: "test",
        limit: 5,
      },
    } as unknown as NextApiRequest

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as NextApiResponse

    // Mock the next handler
    const nextHandler = jest.fn() as NextApiHandler

    await paginationValidator(req, res, nextHandler)

    expect(nextHandler).toBeCalledTimes(0)
    expect(res.status).toBeCalledWith(httpStatus.badRequest.code)
    expect(res.json).toBeCalledWith({
      message: errors.common.offsetMustBeNumber,
    })
  })

  test(testMessage(errors.common.limitMustBeNumber), async () => {
    // Mock the request and response objects
    const req = {
      query: {
        offset: 0,
        limit: "test",
      },
    } as unknown as NextApiRequest

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as NextApiResponse

    // Mock the next handler
    const nextHandler = jest.fn() as NextApiHandler

    await paginationValidator(req, res, nextHandler)

    expect(nextHandler).toBeCalledTimes(0)
    expect(res.status).toBeCalledWith(httpStatus.badRequest.code)
    expect(res.json).toBeCalledWith({
      message: errors.common.limitMustBeNumber,
    })
  })
})
