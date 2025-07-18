import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: CLOUDINARY_API_SECRET 
    });

    // Upload an image
     const uploadFileCloudinary = async (localFilePath) =>{ 

        try {
            if(!localFilePath) return null
            //upload the file on cloudinary
            const responce = await cloudinary.uploader.upload(localFilePath,{
                resource_type: "auto"
            })
            //file has been uploaded successfully
            console.log("File is Uploaded On Cloudinary.",responce.url);

        } catch (error) {
            fs.unlinkSync(localFilePath)//removed local save files as the uploaded operation has failed.
            return null;
        }
        
     }

export default {uploadFileCloudinary}


//impoved version by chatgpt
/*
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Configuration
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET  // ❗FIXED: You were using undefined variable
});

// Upload an image
const uploadFileCloudinary = async (localFilePath) => { 
  try {
    if (!localFilePath) return null;

    // Upload the file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto"
    });

    // Remove the local file after successful upload
    fs.unlinkSync(localFilePath);

    console.log("✅ File uploaded to Cloudinary:", response.url);
    return response;  // ✅ Return response if needed

  } catch (error) {
    console.error("❌ Cloudinary upload failed:", error);

    // Remove local file if upload failed
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return null;
  }
};

export { uploadFileCloudinary };
*/