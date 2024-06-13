import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createDeck } from '../../store/decks';
import { PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline'

const NewDeck = () => {
  const [deckName, setDeckName] = useState('');
  const [category, setCategory] = useState('');
  const [cards, setCards] = useState([{ title: '', body: '' }]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const newCards = [...cards];
    newCards[index][name] = value;
    setCards(newCards);
  };

  const handleAddCard = () => {
    setCards([...cards, { title: '', body: '' }]);
  };

  const handleRemoveCard = (index) => {
    const newCards = cards.filter((_, i) => i !== index);
    setCards(newCards);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDeck = {
      name: deckName,
      category,
      cards
    };
    dispatch(createDeck(newDeck));
    navigate('/dashboard');
  };

  return (
    <div className="p-6 bg-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Create New Deck</h2>
        <button
          type="submit"
          className="bg-black text-white py-2 px-4 rounded-lg hover:opacity-80 transition border-neutral-300 focus:border-black text-md font-semibold border-2"
          onClick={handleSubmit}
        >
          Create Deck
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Deck Name</label>
          <input
            type="text"
            value={deckName}
            onChange={(e) => setDeckName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <h3 className="text-xl font-bold mb-2">Cards</h3>
        {cards.map((card, index) => (
          <div key={index} className="relative mb-4 p-4 border rounded bg-white">
            <TrashIcon className="cursor-pointer absolute top-3 right-4 h-6 w-6 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300" onClick={() => handleRemoveCard(index)}/>
            <div className="mb-2 mt-3">
              <label className="block text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={card.title}
                onChange={(e) => handleInputChange(index, e)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700">Body</label>
              <textarea
                name="body"
                value={card.body}
                onChange={(e) => handleInputChange(index, e)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
        ))}
        <div className="flex justify-center">
          <PlusCircleIcon className="cursor-pointer h-9 w-9 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300" onClick={handleAddCard}/>
        </div>
      </form>
    </div>
  );
};

export default NewDeck;
