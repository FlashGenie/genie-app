import { useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import { uploadPDF, generateFlashcards, createDeck } from '../../store/genie';

function FileUpload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  
  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Await the API utility function
      const parsedText = await uploadPDF(file);
      const flashcards = await generateFlashcards(parsedText);
      const deck = await createDeck('My Deck', 'Study', flashcards);
    
      console.log(deck);
      if (deck) {
        alert('File uploaded successfully!');
      } else {
        alert('File upload failed: Failed to parse text.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    }
  };

  return (
    <div className="p-8 font-sans flex flex-col items-center">
      <h1 className="text-2xl font-bold">Generate instant study materials</h1>
      <p className="text-lg my-4">Upload class notes, lecture slides, or readings</p>
      <form onSubmit={handleSubmit}>
        <div className="border-2 border-solid border-gray-100 rounded-lg py-16 px-8" onDrop={handleDrop} onDragOver={handleDragOver}>
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="fileUpload"
            accept=".pdf"
          />
          {file ? (
            <div className="flex flex-col items-center text-gray-600">
              <p className="font-bold pt-4">File selected: {file.name}</p>
              <p className="text-xs text-gray-500">Make sure your doc has at least 100 characters, but not more than 40,000</p>
            </div>
          ) : (
            <label htmlFor="fileUpload" className="block cursor-pointer">
              <div className="flex flex-col items-center text-gray-600">
                <div className="border w-14 h-14 flex items-center justify-center rounded-full">
                  <FiUpload className="text-4xl" />
                </div>
                <p className="font-bold pt-4">
                  Drag and drop file or <span className="text-blue-500 underline">Click to browse</span>
                </p>
                <p className="mt-2 text-sm">Supported file types: .pdf</p>
                <p className="text-xs text-gray-500">
                  Make sure your doc has at least 100 characters, but not more than 40,000
                </p>
              </div>
            </label>
          )}
        </div>
        <div className="flex flex-col items-center">
          <button type="submit" className="bg-black text-white px-3 py-1 rounded-md my-4">
            Generate Flash Cards
          </button>
        </div>
      </form>
    </div>
  );
}

export default FileUpload;
