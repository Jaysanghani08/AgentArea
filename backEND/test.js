const blob = require("@azure/storage-blob");
const fs = require('fs');


const blobServiceClient = require("./connection/azureBlob");

// Create a unique name for the blob


const BLOB = async (req, res) => {

    try {

        const aadharFile = req.files['aadharFile'][0];
        const id = req.body.id;
        console.log(aadharFile);

        const containerClient = blobServiceClient.getContainerClient(process.env.BLOB_NAME);
        // Create a unique name for the blob
        const blobName = id;

        // Get a block blob client
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        // Display blob name and url
        console.log(
            `\nUploading to Azure storage as blob\n\tname: ${blobName}:\n\tURL: ${blockBlobClient.url}`
        );

        // Upload data to the blob
        const uploadBlobResponse = await blockBlobClient.uploadFile("./docsTemp/resume");
        fs.unlink("./docsTemp/resume",()=>{
            console.log("Successfully deleted from Node.js Server");
        })
        console.log(
            `Blob was uploaded successfully. requestId: ${uploadBlobResponse.requestId}`
        );
        
        res.status(200).send();

    } catch (error) {
        console.log("This is error from test.js");
        console.log(error);
        res.status(202).send();
    }

}

module.exports = BLOB;