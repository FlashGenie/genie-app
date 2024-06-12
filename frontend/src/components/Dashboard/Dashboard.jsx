import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import FlashcardSet from './FlashcardSet';
import Modal from '../Modal/Modal';

function Dashboard() {
  const navigate = useNavigate();
  const flashcardSets = useSelector(state => Object.values(state.decks));
  const [isModalOpen, setIsModalOpen] = useState(false);

  // useEffect(() => {
  //   dispatch(fetchDecks());
  // }, [dispatch]);

  const handleFlashcardSetClick = (id) => {
    navigate(`/decks/${id}`);
  };

  const handleNewFlashCardClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateNewFlashCard = () => {
    // Handle the creation of a new flash card
    console.log('Create New Flash Card');
    handleCloseModal();
  };

  const handleUseGemini = () => {
    console.log('Use GEMINI');
    navigate('/upload');
    handleCloseModal();
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-6 bg-gray-100">
        <div className="text-2xl font-bold mb-4">Dashboard</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {flashcardSets.map((set) => (
            <FlashcardSet
              key={set._id}
              title={set.name}
              termCount={set.cards.length}
              username={set.author ? set.author.username : 'Unknown'}
              onClick={() => handleFlashcardSetClick(set._id)}
            />
          ))}
          <div onClick={handleNewFlashCardClick} className="max-w-sm rounded-lg overflow-hidden shadow-lg p-4 bg-white cursor-pointer flex items-center justify-center">
            <div className="text-2xl font-bold text-gray-500">+ New Flash Card</div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="New Flash Card"
        body={
          <div>
            <button className="bg-black text-white font-bold py-3 px-4 rounded-lg w-full hover:opacity-80 transition border-neutral-300 focus:border-black text-md font-semibold border-2" onClick={handleCreateNewFlashCard}>
              Create New Flash Card
            </button>
            <button className="bg-black text-white font-bold py-3 px-4 rounded-lg w-full hover:opacity-80 transition border-neutral-300 focus:border-black text-md mt-6 font-semibold border-2" onClick={handleUseGemini}>
              Use GEMINI
            </button>
          </div>
        }
      />
    </div>
  );
}

export default Dashboard;
