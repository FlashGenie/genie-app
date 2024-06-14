import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import FlashcardSet from '../Dashboard/FlashcardSet';
import * as favoritesActions from '../../store/favorites.js';
import * as decksActions from '../../store/decks.js';

function Favorites() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const decks = useSelector(state => state.decks);
  const favoritesObj = useSelector(state => state.favorites);
  const [array, setArray] = useState()

  useEffect(() => {
      dispatch(favoritesActions.fetchFavorites(currentUser._id))
      dispatch(decksActions.fetchDecks())

  }, [dispatch, currentUser._id]);

  useEffect(() => {
    const favoriteDecks = Object.values(favoritesObj).map(favorite => decks[favorite.deck]).filter(Boolean);
    setArray(favoriteDecks);
  }, [favoritesObj, decks]);

  const handleFlashcardSetClick = (id) => {
    navigate(`/decks/${id}`);
  };

  if (!array || array.length === 0) {
    return(
      <div className="flex">
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
      <div className="flex-grow p-6 bg-gray-100">
        <div className="text-2xl font-bold mb-4">Favorites</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {array.map((set) => (
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
