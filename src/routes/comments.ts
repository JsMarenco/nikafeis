import { Router } from "express"

import createComment from "../controllers/comment/createComment"
import likeComment from "../controllers/comment/likeComment"
import deleteAllComments from "../controllers/comment/deleteAllComments"
import getCommentWithLimit from "../controllers/comment/getCommentWithLimit"

import replyComment from "../controllers/reply/replyComment"
import likeReply from "../controllers/reply/likeReply"

const router = Router()

try {
  router.post("/", createComment)

  router.post("/:commentId/like", likeComment)

  router.post("/:commentId/reply", replyComment)
  router.post("/:commentId/reply/:replyId/like", likeReply)

  router.get("/:postId/:offset/:limit", getCommentWithLimit)

  // test only
  if (process.env.NODE_ENV === "development") {
    router.delete("/", deleteAllComments)
  }
} catch (error) {
  console.error(error)
}

export default router