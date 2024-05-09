const blob = require("@azure/storage-blob");
const fs = require('fs');


const blobServiceClient = require("../connection/azureBlob");


// Create a unique name for the blob

const docsUpload = async (name) => {

    try {

        const containerClient = blobServiceClient.getContainerClient(process.env.BLOB_NAME);

        const blockBlobClient = containerClient.getBlockBlobClient(name);

        // console.log(
        //     `\nUploading to Azure storage as blob\n\tname: ${blobName}:\n\tURL: ${blockBlobClient.url}`
        // );

        const url = blockBlobClient.url;

        const blobOptions = { blobHTTPHeaders: { blobContentType: 'application/pdf' } };

        const uploadBlobResponse = await blockBlobClient.uploadFile(name,blobOptions);

        // console.log(
        //     `Blob was uploaded successfully. requestId: ${uploadBlobResponse.requestId}`
        // );

        // console.log(url);

        return url;

    } catch (error) {
        console.log("This is error from ./blob/azureBlob.js");
        console.log(error);
        return "";
    }
}





module.exports = docsUpload;





