import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import FlashcardSet from './FlashcardSet';
import { fetchDecks } from '../../store/decks';

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const flashcardSets = useSelector(state => Object.values(state.decks));

  useEffect(() => {
    dispatch(fetchDecks());
  }, [dispatch]);

  const handleFlashcardSetClick = (id) => {
    navigate(`/decks/${id}`);
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
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
