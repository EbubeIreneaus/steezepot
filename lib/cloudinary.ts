import {v2 as cloudinary} from 'cloudinary'
import streamifier from 'streamifier'
const config = useRuntimeConfig()

cloudinary.config({
    cloud_name: 'dx0f23f3t',
    api_key: config.CLOUDINARY_API_KEY,
    api_secret: config.CLOUDINARY_API_SECRET,
    secure: true
})

 export const uploadBufferToCloudinary = (buffer: Buffer, folder: string = 'steeze-pot') => {
    console.log(config)
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream({folder: folder}, (error, result) => {
            if (error) return reject(error)
            resolve(result)
        })
        streamifier.createReadStream(buffer).pipe(uploadStream)
    })
 }

export default cloudinary;
