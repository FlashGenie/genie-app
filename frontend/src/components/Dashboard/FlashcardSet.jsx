import { UserIcon } from '@heroicons/react/24/outline';

const FlashcardSet = ({ title, termCount, username, onClick }) => {
  return (
    <div onClick={onClick} className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white cursor-pointer">
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
