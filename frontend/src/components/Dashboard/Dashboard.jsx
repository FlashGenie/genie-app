import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import FlashcardSet from './FlashcardSet';
import Modal from '../Modal/Modal';

function Dashboard() {
  const navigate = useNavigate();
  const allFlashcardSets = useSelector(state => Object.values(state.decks));
  const currentUser = useSelector(state => state.session.user)
  const flashcardSets = []
  
  allFlashcardSets.forEach((deck)=>{
    if(deck.author === currentUser._id){
      flashcardSets.push(deck)
    }
  })
  const [isModalOpen, setIsModalOpen] = useState(false);

  // useEffect(() => {
  //   dispatch(fetchDecks());
  // }, [dispatch]);

  const handleFlashcardSetClick = (id) => {
    console.log(id)
    navigate(`/decks/${id}`);
  };

  const handleNewFlashCardClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateNewFlashCard = () => {
    navigate('/decks/new');
    handleCloseModal();
  };

  const handleUseGemini = () => {
    navigate('/upload');
    handleCloseModal();
  };

  return (
    <div className="flex w-full min-h-screen-minus-80">
      <div className="flex-grow p-6 bg-gray-100">
        <div className="text-2xl font-bold mb-4">Dashboard</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {flashcardSets.map((set) => (
            <FlashcardSet
              key={set._id}
              title={set.name}
              termCount={set.cards.length}
              username={set.authorName ? set.authorName: 'Unknown'}
              genieCreated={set.genieCreated}
              //this fav button below if is true the heart will show up on the flash card if is false not
              // fav={true}   
              onClick={() => handleFlashcardSetClick(set._id)}
            />
          ))}
          <div onClick={handleNewFlashCardClick}  className="p-[1px] bg-gradient-to-r from-slate-400 to-slate-400 relative max-w-sm rounded-xl overflow-hidden shadow-sm cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:shadow-lg">
            <div onClick={handleNewFlashCardClick} className="h-full w-full relative rounded-xl overflow-hidden shadow-lg p-4 bg-white flex items-center justify-center cursor-pointer">
              <div className="text-2xl font-bold text-gray-500">+ New Deck</div>
            </div>
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
              Use GENIE
            </button>
          </div>
        }
      />
    </div>
  );
}

export default Dashboard;