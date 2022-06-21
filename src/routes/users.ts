import { Router } from "express"

import deleteUser from "../controllers/user/deleteUser"
import forgotPassword from "../controllers/user/forgotPassword"
import getUserByUsername from "../controllers/user/getUserByUsername"
import getUserPosts from "../controllers/user/getUserPost"
import loginUser from "../controllers/user/loginUser"
import registerUser from "../controllers/user/registerUser"
import updateUser from "../controllers/user/updateUser"
import resetPassword from "../controllers/user/restPassword"
import deleteAllUsers from "../controllers/user/deleteAllUsers"
import getAllUsers from "../controllers/user/getAllUsers"

const router = Router()

try {
  router.post("/register", registerUser)
  router.post("/login", loginUser)
  router.post("/forgot-password", forgotPassword)

  router.get("/:username", getUserByUsername)
  router.get("/:username/posts", getUserPosts)
  router.post("/:userId", deleteUser)
  router.put("/:userId", updateUser)

  router.post("/:userId/reset-password", resetPassword)
  router.get("/", getAllUsers)

  // test only
  if (process.env.NODE_ENV === "development") {
    router.delete("/", deleteAllUsers)
  }
} catch (error) {
  console.error(`Error in users.ts: ${error}`)
}

export default router