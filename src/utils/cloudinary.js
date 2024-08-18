import {v2 as cloudinary} from "cloudinary";
import fs from "fs";


cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.CLOUD_API_KEY,
    api_secret : process.env.CLOUD_API_SECRET
})

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        //upload the file on couldinary
        const responce = await cloudinary.uploader.upload(localFilePath, {
            resource_type : "auto"
        })
        // file has been upload successfully
        console.log("file is uploaded on cloudinary", responce.url)
        return responce;
    } catch (error) {
        fs.unlinkSync(localFilePath) // Remove the locally saved temporary file as the upload option got failed
        return null
    }
}

export { uploadOnCloudinary }