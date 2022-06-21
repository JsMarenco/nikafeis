import { Router } from "express"

import createPost from "../controllers/post/createPost"
import getPost from "../controllers/post/getPost"
import getRecentPosts from "../controllers/post/getRecentPosts"
import likePost from "../controllers/post/likePost"
import deleteAllPost from "../controllers/post/deleteAllPost"

const router = Router()

try {
  router.get("/recent", getRecentPosts)

  router.post("/", createPost)
  router.get("/:postId", getPost)
  
  router.put("/:postId/like", likePost)

  // test only
  if(process.env.NODE_ENV === "development") {
    router.delete("/", deleteAllPost)
  }
} catch (error) {
  console.error(error)
}

export default router