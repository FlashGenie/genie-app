import { useState } from 'react';
import { UserIcon, HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { useSelector, useDispatch } from 'react-redux';
import * as favoritesActions from '../../store/favorites.js';
import * as decksActions from '../../store/decks.js';


const FlashcardSet = ({ deckId, title, termCount, username, onClick, initialFav, genieCreated}) => {
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

  const hoverEffect = "transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:shadow-lg";

  return (
    <div 
      onClick={onClick} 
      className={
        genieCreated 
          ? `p-[1px] bg-gradient-to-r from-[#FDAB1A] via-[#F63973] to-[#38B1EF] 
          relative max-w-sm rounded-[13px] overflow-hidden shadow-sm cursor-pointer ${hoverEffect}` 
          : `p-[1px] bg-gradient-to-r from-slate-400 to-slate-400 relative 
          max-w-sm rounded-[13px] overflow-hidden shadow-sm cursor-pointer ${hoverEffect}`
      }
    >
      <div onClick={onClick} className="relative rounded-xl overflow-hidden shadow-lg p-4 bg-white cursor-pointer">
          <div className="flex flex-col items-center absolute top-2 right-2">
            {fav ? (
              <HeartSolid className="h-6 w-6 text-red-500" onClick={toggleFavFalse} />    //this checks is the prop passed from the parent class is true then the heart will be red
            ) : (
              <HeartOutline className="h-6 w-6 text-gray-500" onClick={toggleFavTrue} />  //else will be hert with empty inside
            )}
            <span className='absolute mt-[20px] text-gray-500 text-[11px] font-bold' >{deck.favoriteCount}</span>
          </div>
        <div className="font-bold text-xl mb-2">{title}</div>
        <div className="text-gray-700 text-base flex items-center space-x-2">
          <span>{termCount} terms</span>
        </div>
        <div className="mt-4 flex items-center">
          <UserIcon className="h-5 w-5 text-gray-500 mr-1" />
          <span className="text-gray-500 text-sm">{username}</span>
        </div>
        {genieCreated && (
          <div 
            className='flex justify-center items-center absolute right-3 bottom-4 px-2 rounded-lg' 
            style={{background: 'linear-gradient(90deg, rgba(253, 171, 26, 0.1), rgba(246, 57, 115, 0.1), rgba(227, 139, 250, 0.1), rgba(56, 177, 239, 0.1))'}}
          >
            <p className='text-xs px-1 text-gray-500'>Made with </p>
            <img src="logoGray.svg" alt="genie" className="w-6 h-6"/>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashcardSet;