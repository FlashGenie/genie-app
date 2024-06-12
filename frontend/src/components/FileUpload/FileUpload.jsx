import { useState, useRef } from 'react';
import { FiUpload, FiLoader, FiXCircle } from 'react-icons/fi';
import { uploadPDF, generateFlashcards } from '../../store/genie';
import { createDeck } from '../../store/decks';
import { useDispatch } from 'react-redux';
import { openGenerateDeckModal } from '../../store/modal';

function FileUpload() {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [localErrors, setLocalErrors] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setLocalErrors([]);
  };
  
  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setLocalErrors([]); 
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleRemoveFile = () => {
    setFile(null);
    setLocalErrors([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      setLocalErrors(['Please select a file to upload.']);
      return;
    }

    setLoading(true);
    setLocalErrors([]); 

    try {
      // Upload the PDF and extract text
      const parsedText = await uploadPDF(file);

      // Generate flashcards from the extracted text
      const flashcards = await generateFlashcards(parsedText);

      // Create a new deck with the generated flashcards
      const deckData = {
        name: 'My Deck', 
        category: 'Study', 
        cards: flashcards
      };

      const response = dispatch(createDeck(deckData));

      setLoading(false);

      if (response) {
        dispatch(openGenerateDeckModal());
        console.log('Deck created successfully!');
      } else {
        setLocalErrors(['File upload failed: Please try again.']);
      }
    } catch (error) {
      setLocalErrors(['Error uploading file']);
      setLoading(false);
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
            ref={fileInputRef}
          />
          {file ? (
            <div className="flex flex-col items-center text-gray-600">
              <div className="flex items-center">
                <p className="font-bold pt-4">File selected: {file.name}</p>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="ml-2 pt-4 text-red-600 hover:text-red-800"
                >
                  <FiXCircle className="text-xl" />
                </button>
              </div>
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
        {localErrors.length > 0 && (
          <ul className="text-red-600 mt-2 flex flex-col items-center">
            {localErrors.map((error, index) => (
              <li key={index} className="font-semibold flex gap-2 items-center">
                <FiXCircle />
                {error}
              </li>
            ))}
          </ul>
        )}
        <div className="flex flex-col items-center">
          <button type="submit" className="bg-black text-white px-3 py-1 rounded-md my-4">
            {loading ? (
              <span className="flex items-center">
                <FiLoader className="animate-spin mr-2" />
                Generating...
              </span>
            ) : (
              "Generate Flash Cards"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FileUpload;


