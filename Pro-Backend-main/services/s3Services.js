const dotenv = require("dotenv");
const fs = require("fs");
dotenv.config();
const s3 = require("../config/awsConfig");

// Define the simplified uploadFile function
const uploadFile = (file, bucketName) => {
  // Read file content
  const fileContent = fs.readFileSync(file.path);

  // Set up S3 parameters
  const params = {
    Bucket: bucketName, // The S3 bucket name where you want to upload the file
    Key: file.originalname, // The key (filename) under which the file will be stored in S3
    Body: fileContent, // The file content to upload
  };

  // Upload the file to S3 and return the promise
  return s3.upload(params).promise();
};

// Delete File Function

const deleteFile = async (fileUrl) => {
  if (!fileUrl) {
    throw new Error("File URL is required");
  }

  try {
    // Extract the bucket name and key from the file URL
    const url = new URL(fileUrl);
    const bucketName = url.hostname.split(".")[0]; // Extract the bucket name
    const key = url.pathname.substring(1); // Remove the leading '/'

    const params = {
      Bucket: bucketName,
      Key: key,
    };

    await s3.deleteObject(params).promise();
    // console.log(`File ${key} deleted successfully from AWS S3`);
  } catch (error) {
    // console.log(`Error deleting file from AWS S3: ${error.message}`);
    throw error;
  }
};

module.exports = { uploadFile, deleteFile };
