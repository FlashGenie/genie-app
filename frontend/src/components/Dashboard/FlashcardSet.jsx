import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { UserIcon, HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';

const FlashcardSet = ({ title, termCount, username, onClick, initialFav, genieCreated}) => {
  const location = useLocation();
  const [fav, setFav] = useState(initialFav);

  const toggleFav = (e) => {
    e.stopPropagation();
    setFav(!fav);
  };

  const hoverEffect = "transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300";

  return (
    <div onClick={onClick} className={genieCreated ? `p-[1px] bg-gradient-to-r from-[#FDAB1A] via-[#F63973] to-[#38B1EF] relative max-w-sm rounded-xl overflow-hidden shadow-sm cursor-pointer ${hoverEffect}` : `relative max-w-sm rounded-xl overflow-hidden shadow-sm cursor-pointer ${hoverEffect}`}>
      <div onClick={onClick} className="relative rounded-xl overflow-hidden shadow-lg p-4 bg-white cursor-pointer">
        {location.pathname === '/explore' && (    //this line make sure that the heart is only visible in the /explore page
          <div className="absolute top-2 right-2">
            {fav ? (
              <HeartSolid className="h-6 w-6 text-red-500" onClick={toggleFav} />    //this checks is the prop passed from the parent class is true then the heart will be red
            ) : (
              <HeartOutline className="h-6 w-6 text-gray-500" onClick={toggleFav} />  //else will be hert with empty inside
            )}
          </div>
        )}
        <div className="font-bold text-xl mb-2">{title}</div>
        <div className="text-gray-700 text-base flex items-center space-x-2">
          <span>{termCount} terms</span>
        </div>
        <div className="mt-4 flex items-center">
          <UserIcon className="h-5 w-5 text-gray-500 mr-1" />
          <span className="text-gray-500 text-sm">{username}</span>
        </div>
        {genieCreated && (
          <div className='flex justify-center items-center absolute right-3 bottom-4 px-2 rounded-lg' style={{background: 'linear-gradient(90deg, rgba(253, 171, 26, 0.1), rgba(246, 57, 115, 0.1), rgba(227, 139, 250, 0.1), rgba(56, 177, 239, 0.1))' }}>
            <p className='text-xs px-1 text-gray-500'>Made with </p>
            <img src="logoGray.svg" alt="genie" className="w-6 h-6"/>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashcardSet;