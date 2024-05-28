import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

cloudinary.config({

    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
    

});

const uploadOnCloudinary = async (localFilePath) => {
   
    try {
        console.log("Enter is cloudinary", localFilePath);
        if (!localFilePath) return null;
            const responce = await cloudinary.uploader.upload(localFilePath,
                {
                    resource_type: "auto"
                }
        )

        console.log("file uploaded successfully", responce.url);
        fs.unlinkSync(localFilePath)
        return responce
    } catch (error) {
        fs.unlinkSync(localFilePath)
        console.log(error);
        return null
    }
}

export { uploadOnCloudinary }

import AWS from 'aws-sdk';

import path from 'path';

// Configure the AWS SDK with your credentials and region
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION

});

const s3 = new AWS.S3();

const uploadToS3 = async (localFilePath) => {
    console.log(process.env.AWS_REGION);
    console.log(process.env.S3_BUCKET_NAME,);
    try {
        console.log("Enter is S3 upload", localFilePath);
        if (!localFilePath) return null;

        // Read the file content
        const fileContent = fs.readFileSync(localFilePath);

        // Get the file name from the file path
        const fileName = path.basename(localFilePath);

        // Set the S3 upload parameters
        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: fileName, // File name you want to save as in S3
            Body: fileContent,
            ContentType: "auto" // Adjust the content type as needed
        };

        // Uploading files to the bucket
        const data = await s3.upload(params).promise();
        console.log(data);

        console.log(`File uploaded successfully. ${data.Location}`);
        
        // Remove the file from the local system after upload
        fs.unlinkSync(localFilePath);

        return data;
    } catch (error) {
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        console.error(error);
        return null;
    }
};

export { uploadToS3 };
