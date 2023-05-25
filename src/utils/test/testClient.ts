// Third-party dependencies
import request from "supertest"
import { RequestListener, createServer } from "http"
import { NextApiHandler } from "next"
import { apiResolver } from "next/dist/server/api-utils/node"

// Current project dependencies

/**
 * Create a test client for Next.js API routes.
 * @param {NextApiHandler} handler - The Next.js API route handler.
 * @returns {import("supertest").SuperTest<import("supertest").Test>} - The test client instance.
 */
const testClient = (
  handler: NextApiHandler,
  query?: object,
  headers?: object
): import("supertest").SuperTest<import("supertest").Test> => {
  const listener: RequestListener = (req, res) => {
    // Set the headers on the request
    req.headers = {
      ...req.headers,
      ...headers,
    }

    return apiResolver(
      req,
      res,
      query,
      handler,
      {
        previewModeEncryptionKey: "",
        previewModeId: "",
        previewModeSigningKey: "",
      },
      false
    )
  }

  return request(createServer(listener))
}

export default testClient
