import { useState } from 'react';
// import { useLocation } from 'react-router-dom';
import { UserIcon, HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { useDispatch, useSelector } from 'react-redux';
import * as favoritesActions from '../../store/favorites.js';

const FlashcardSet = ({ key, title, termCount, username, onClick, initialFav }) => {
  // const location = useLocation();
  const [fav, setFav] = useState(initialFav);
  const dispatch = useDispatch();

  const flashcardSets = useSelector(state => Object.values(state.decks));
  let deckData;

  if (flashcardSets.length === 0) {
    return
  }

  flashcardSets.map((set) => {
    if (set._id === key) {
      deckData = set
    } else {
      console.error("no deck found");
    }
  })

  const toggleFav = (e) => {
    e.stopPropagation();
    dispatch(favoritesActions.createFavorite(deckData))
    setFav(!fav);
  };

  return (
    <div onClick={onClick} className="relative max-w-sm rounded-lg overflow-hidden shadow-lg p-4 bg-white cursor-pointer">
      {/* {location.pathname === '/explore' && (    //this line make sure that the heart is only visible in the /explore page */}
        <div className="absolute top-2 right-2">
          {fav ? (
            <HeartSolid className="h-6 w-6 text-red-500" onClick={toggleFav} />    //this checks is the prop passed from the parent class is true then the heart will be red
          ) : (
            <HeartOutline className="h-6 w-6 text-gray-500" onClick={toggleFav} />  //else will be hert with empty inside
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