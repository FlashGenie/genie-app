import React, { useState } from 'react';
import jwtFetch from '../../store/jwt';

function Upload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (file) {
      const formData = new FormData();
      formData.append('pdfFile', file);

      try {
        const response = await jwtFetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();
        if (response.ok) {
          alert('File uploaded successfully!');
        } else {
          alert('File upload failed: ' + result.message);
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('Error uploading file');
      }
    } else {
      alert('Please select a file to upload.');
    }
  };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" id="pdfFile" accept="application/pdf" onChange={handleFileChange}/>
            <button type="submit">Upload</button>
        </form> 
    )
}

export default Upload;