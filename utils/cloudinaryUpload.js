import {Readable} from "stream";
import {v2 as cloudinary} from "cloudinary"
import "dotenv/config"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})

export async function bufferUploader(buffer){
   return new Promise((resolve, reject)=>{
    if(!Buffer.isBuffer(buffer)) return reject(new TypeError("Expected a Buffer"));
    try {
        const uploadStream = cloudinary.uploader.upload_stream(
            {folder: "screenshots", 
             transformation:[
                { quality: "auto", fetch_format: "auto" }
             ]
            },
            (err, result)=>{
                if(err) return reject(err)
                if(!result || !result.secure_url) return reject(new Error("No result returned from Cloudinary"))
                resolve(result)
            }
        )
    
        Readable.from([buffer]).pipe(uploadStream)
        
    } catch (error) {
        reject(error);
    }
   })
}