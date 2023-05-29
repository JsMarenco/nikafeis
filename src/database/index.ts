// Imports from third-party libraries
import { connect, connection } from "mongoose"

let isConnected = false

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

    const MONGODB_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.yj7huxx.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`

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

    if (!isConnected) {
      await connect(MONGODB_URI, options)
      isConnected = true
      console.log("New database connection established!")
    } else {
      console.log("Reusing existing database connection.")
    }
  } catch (error) {
    console.error("An error occurred while connecting to the database:", error)
  }
}

// Handle connection errors
connection.on("error", (err) => {
  console.error("An error occurred with the database connection:", err)
})

/**
 * @function emptyDatabase
 * @async
 * @description Empties the MongoDB database by dropping all collections
 */
export const emptyDatabase = async () => {
  try {
    await connectWithRetry()
    const collections = connection.collections

    for (const key in collections) {
      const collection = collections[key]
      await collection.deleteMany({})
    }

    console.log("Successfully emptied the database!")
  } catch (error) {
    console.error("An error occurred while emptying the database:", error)
  } finally {
    connection.close()
  }
}

export default connectWithRetry
