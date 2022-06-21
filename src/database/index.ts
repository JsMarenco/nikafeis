
// connect to the database mongodb and make sure that the database is running
// Language: typescript

import mongoose from "mongoose"

const uri =
  process.env.NODE_ENV === "production" ? (
    process.env.MONGODB_URI || ""
  ) : (
    process.env.MONGODB_URI_TEST || ""
  )

const options = {
  autoIndex: false, // Don't build indexes
  maxPoolSize: 3, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
}

const connectWithRetry = () => {
  mongoose.connect(uri, options).then(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("We are connected to the database!")
    }

  }).catch(err => {
    console.log(err)
  })
}

export default connectWithRetry