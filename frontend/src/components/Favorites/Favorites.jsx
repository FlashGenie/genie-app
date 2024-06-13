import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Dashboard/Sidebar';
import FlashcardSet from '../Dashboard/FlashcardSet';
import * as favoritesActions from '../../store/favorites.js';

function Favorites() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const flashcardSets = useSelector(state => Object.values(state.decks));
  const currentUser = useSelector(state => state.session.user)
  // const [fav, setFav] = useState(false);

  useEffect(() => {
      dispatch(favoritesActions.fetchFavorites(currentUser._id))
  }, [dispatch, currentUser._id]);

  const favoritesDecks = useSelector(state => Object.values(state.favorites));

  const handleFlashcardSetClick = (id) => {
    navigate(`/decks/${id}`);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-6 bg-gray-100">
        <div className="text-2xl font-bold mb-4">Favorites</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoritesDecks.map((set) => (
            <FlashcardSet
              key={set._id}
              title={set.name}
              termCount={set.cards.length}
              username={set.author ? set.author.username : 'Unknown'}
              initialFav={false}
              onClick={() => handleFlashcardSetClick(set._id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Favorites;
