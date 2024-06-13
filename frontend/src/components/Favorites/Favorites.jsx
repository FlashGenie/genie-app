import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import Sidebar from '../Dashboard/Sidebar';
import FlashcardSet from '../Dashboard/FlashcardSet';
import * as favoritesActions from '../../store/favorites.js';

function Favorites() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user)
  const favoriteDecks = useSelector(state => Object.values(state.favorites));

  useEffect(() => {
      dispatch(favoritesActions.fetchFavorites(currentUser._id));
  }, [dispatch, currentUser]);

  const handleFlashcardSetClick = (id) => {
    navigate(`/decks/${id}`);
  };

  if (favoriteDecks.length === 0) {
    return(
      <div className="flex">
        <Sidebar />
        <div className="flex-grow p-6 bg-gray-100">
          <div className="text-2xl font-bold mb-4">Favorites</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div className="max-w-sm rounded-lg overflow-hidden shadow-lg p-4 bg-white cursor-pointer flex items-center justify-center">
              <Link to={'/dashboard'} ><div className="text-2xl font-bold text-gray-500">+ Add Favorites</div></Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-6 bg-gray-100">
        <div className="text-2xl font-bold mb-4">Favorites</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoriteDecks.map((set) => (
            <FlashcardSet
              key={set._id}
              deckId={set._id}
              
              title={set.name}
              termCount={set.cards.length}
              username={set.author ? set.author.username : 'Unknown'}
              initialFav={true}
              onClick={() => handleFlashcardSetClick(set._id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Favorites;
