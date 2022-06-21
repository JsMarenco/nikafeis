import fs from "fs-extra"
import cloudinary_ from "cloudinary"

const cloudinary = cloudinary_.v2

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME || "",
  api_key: process.env.CLOUDINARY_API_KEY || "",
  api_secret: process.env.CLOUDINARY_API_SECRET || "",
})

const uploadImageToCloudinary = async (path: string) => {
  const result = await cloudinary.uploader.upload(path)

  fs.unlinkSync(path)

  return result.secure_url
}

export default uploadImageToCloudinary
