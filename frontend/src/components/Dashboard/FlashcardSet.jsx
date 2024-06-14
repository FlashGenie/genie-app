import { useState } from 'react';
import { UserIcon, HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { useSelector, useDispatch } from 'react-redux';
import * as favoritesActions from '../../store/favorites.js';
import * as decksActions from '../../store/decks.js';


const FlashcardSet = ({ deckId, title, termCount, username, onClick, initialFav }) => {
  const [fav, setFav] = useState(initialFav);
  const dispatch = useDispatch();
  const allFavorites = useSelector(state => Object.values(state.favorites));
  const allDecks = useSelector(state => Object.values(state.decks));
  let favoriteId
  let deck

  allDecks.forEach((set) => {
    if (set._id === deckId) {
      deck = set
    }
  })

  const toggleFavTrue = (e) => {
    e.stopPropagation();

    let favorited = false

    allFavorites.forEach((favorite) => {
      if (favorite.deck === deckId) {
        favorited = true
      }
    })

    if (favorited === true) {
      return null
    }

    deck.favoriteCount += 1
    dispatch(decksActions.editDeck(deck._id, deck))

    const data = { deckId: deckId }
    dispatch(favoritesActions.createFavorite(data));
    setFav(true);
  };

  const toggleFavFalse = (e) => {
    e.stopPropagation();

    allFavorites.forEach((favorite) => {
      if (favorite.deck === deckId) {
        favoriteId = favorite._id
      }
    })

    deck.favoriteCount -= 1
    dispatch(decksActions.editDeck(deck._id, deck))

    dispatch(favoritesActions.removeFavorite(favoriteId))
    setFav(false);
  };

  return (
    <div onClick={onClick} className="relative max-w-sm rounded-lg overflow-hidden shadow-lg p-4 bg-white cursor-pointer">
      {/* {location.pathname === '/explore' && (    //this line make sure that the heart is only visible in the /explore page */}
        <div className="absolute top-2 right-2">
          {fav ? (
            <HeartSolid className="h-6 w-6 text-red-500" onClick={toggleFavFalse} />    //this checks is the prop passed from the parent class is true then the heart will be red
          ) : (
            <HeartOutline className="h-6 w-6 text-gray-500" onClick={toggleFavTrue} />  //else will be hert with empty inside
          )}
        </div>
      {/* )} */}
      <div className="font-bold text-xl mb-2">{title}</div>
      <div className="text-gray-700 text-base flex items-center space-x-2">
        <span>{termCount} terms</span>
      </div>
      <div className="mt-4 flex items-center">
        <UserIcon className="h-5 w-5 text-gray-500 mr-1" />
        <span className="text-gray-500 text-sm">{username}</span>
      </div>
    </div>
  );
};

export default FlashcardSet;