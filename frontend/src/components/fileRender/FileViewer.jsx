import React from 'react';

const FileViewer = ({ fileUrl }) => {
    const getFileType = (url) => {

        const extension = "pdf";
        const mimeTypes = {
            pdf: 'application/pdf',
            jpg: 'image/jpeg',
            jpeg: 'image/jpeg',
            png: 'image/png',
        };
        
        return mimeTypes[extension] || '';
    };

    const renderFile = () => {
        const fileType = getFileType(fileUrl);

        switch (fileType) {
            case 'application/pdf':
                return <embed src={fileUrl} type={fileType} width="100%" height="600px" />;
            case 'image/jpeg':
            case 'image/png':
                return <img src={fileUrl} alt="File" />;
            default:
                return <p>Unsupported file type</p>;
        }
    };

    return (
        <div>
            {renderFile()}
        </div>
    );
};

export default FileViewer;
