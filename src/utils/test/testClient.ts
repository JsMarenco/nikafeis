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
  handler: NextApiHandler
): import("supertest").SuperTest<import("supertest").Test> => {
  const listener: RequestListener = (req, res) => {
    return apiResolver(
      req,
      res,
      undefined,
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
