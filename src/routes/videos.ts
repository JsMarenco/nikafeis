import { Router } from "express"

import getTopVideos from "../controllers/video/getTopVideos"

const router = Router()

try {
  router.get("/recent", getTopVideos)
} catch (error) {
  console.error(error)
}

export default router