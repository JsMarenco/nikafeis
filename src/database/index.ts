// Imports from third-party libraries
import { connect, connection } from "mongoose"

/**
 * @function connectWithRetry
 * @async
 * @description Attempts to connect to the MongoDB database with retry
 */
const connectWithRetry = async () => {
  try {
    const DB_NAME = process.env.DB_NAME || ""
    const DB_USER = process.env.DB_USER || ""
    const DB_PASSWORD = process.env.DB_PASSWORD || ""

    const MONGODB_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.lkzuorc.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`

    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      autoIndex: false, // Don't build indexes
      maxPoolSize: 10, // Maintain up to 10 socket connections
      // serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4, // Use IPv4, skip trying IPv6
    }

    await connect(MONGODB_URI, options)

    console.log("We are connected to the database!")
  } catch (error) {
    console.error("An error occurred while connecting to the database:", error)
    // Retry the connection after a delay
    setTimeout(connectWithRetry, 5000)
  }
}

// Only connect to the database if not already connected
if (connection.readyState === 0) {
  connectWithRetry()
}

// Handle connection errors
connection.on("error", (err) => {
  console.error("An error occurred with the database connection:", err)
})

export default connectWithRetry
