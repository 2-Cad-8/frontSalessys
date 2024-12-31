import React, { useState } from 'react';
import axios from 'axios';

function CSVUploader() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setUploadStatus({ type: 'error', message: 'Please select a file' });
            return;
        }

        const formData = new FormData();
        formData.append('csv_file', selectedFile);

        try {
            const response = await axios.post('/api/v1/upload-csv/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setUploadStatus({ type: 'success', message: response.data.message });
        } catch (error) {
            console.error("Upload error:", error);
            if (error.response) {
                setUploadStatus({ type: 'error', message: error.response.data.error || 'Upload failed' });
            } else {
                setUploadStatus({ type: 'error', message: 'Upload failed. Please check your network.' });
            }
        }
    };

    return (
        <div>
            <input type="file" accept=".csv" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={!selectedFile}>Upload CSV</button>
            {uploadStatus && (
                <div className={uploadStatus.type === 'success' ? 'success-message' : 'error-message'}>
                    {uploadStatus.message}
                </div>
            )}
        </div>
    );
}

export default CSVUploader;