import fs from "fs"
import { v2 as cloudinary } from "cloudinary"
import "dotenv/config"
import axios from "axios"

// cloudinary api keys
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// function to upload file on cloudinary
export const uploadOnCloudinary = (file, folder) => {

    return new Promise(async (resolve, reject) => {
        try {

            if (!file) {
                reject(new Error("File not provided"))
                return null
            }

            const buffer = await file?.arrayBuffer()
            const bytes = Buffer.from(buffer)

            // upload file
            cloudinary.uploader.upload_stream({
                resource_type: "auto",
                folder: folder
            }, async (error, result) => {
                if (error) {
                    reject(error)
                }
                console.log("cloudinary: ", result);
                resolve(result)
            }).end(bytes)


        } catch (error) {

            reject(error)

        }
    })

}

export const deleteOnCloudinary = (fileUrl) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!fileUrl) {
                reject(new Error("File URL not provided"))
                return null
            }

            const public_id = `we-app-nextjs/posts/${fileUrl.split("/").pop().split(".")[0]}`

            const resp = await cloudinary.uploader.destroy(public_id)

            resolve(resp)

        } catch (error) {
            reject(error)
        }
    });
}