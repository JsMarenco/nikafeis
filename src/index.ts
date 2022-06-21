import express, { Request, Response } from "express"
import morgan from "morgan"
import cors from "cors"
import dotenv from "dotenv"
import multer from "multer"
import path from "path"

dotenv.config()

import usersRoutes from "./routes/users"
import postsRoutes from "./routes/posts"
import videosRoutes from "./routes/videos"
import commentsRoutes from "./routes/comments"

import connectWithRetry from "./database"

const app = express()

const port = process.env.PORT || 8080

// Middlewares
app.use(morgan("dev"))
app.use(cors())
app.set("json spaces", 2)
app.use(express.json())

const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/img/uploads"),
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + path.extname(file.originalname))
  }
})

app.use(multer({ storage }).single("image_src"))

// Routes
app.use("/api/users", usersRoutes)
app.use("/api/posts", postsRoutes)
app.use("/api/videos", videosRoutes)
app.use("/api/comments", commentsRoutes)

// Route 404
app.use((req: Request, res: Response) => {
  res.status(404).send("Not found")
})

// catch error
app.use((err: Error, req: Request, res: Response) => {
  console.error(`Error: ${err}`)

  res.status(500).json({
    error: err.message,
  })
})

app.listen(port, () => {
  connectWithRetry()

  if (process.env.NODE_ENV === "development") {
    console.log(`Server running on port ${port}`)
  }
})