import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchDeck, editDeck, removeDeck, removeDeckCard } from '../../store/decks';
import { PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline';

const DeckDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deck = useSelector(state => state.decks[id]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDeck, setEditedDeck] = useState(null);
  const [newCards, setNewCards] = useState([]);
  const [cardsToDelete, setCardsToDelete] = useState([]);

  useEffect(() => {
    if (id) {
      dispatch(fetchDeck(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (deck) {
      setEditedDeck({ ...deck });
    }
  }, [deck]);

  if (!deck || !editedDeck) {
    return <div>Loading...</div>;
  }

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const updatedDeck = {
      ...editedDeck,
      cards: editedDeck.cards.filter(card => !cardsToDelete.includes(card._id)).concat(newCards),
    };
    dispatch(editDeck(id, updatedDeck));
    cardsToDelete.forEach(cardId => dispatch(removeDeckCard(id, cardId)));
    setIsEditing(false);
    setNewCards([]);
    setCardsToDelete([]);
  };

  const handleDeleteClick = () => {
    dispatch(removeDeck(id));
    navigate('/dashboard');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedDeck({
      ...editedDeck,
      [name]: value
    });
  };

  const handleCardChange = (index, e) => {
    const { name, value } = e.target;
    const newCards = [...editedDeck.cards];
    newCards[index][name] = value;
    setEditedDeck({ ...editedDeck, cards: newCards });
  };

  const handleNewCardChange = (index, e) => {
    const { name, value } = e.target;
    const newCardsCopy = [...newCards];
    newCardsCopy[index][name] = value;
    setNewCards(newCardsCopy);
  };

  const handleAddNewCard = () => {
    setNewCards([...newCards, { title: '', body: '' }]);
  };

  const handleRemoveNewCard = (index) => {
    const updatedNewCards = newCards.filter((_, i) => i !== index);
    setNewCards(updatedNewCards);
  };

  const handleCardDeleteClick = (cardId) => {
    setCardsToDelete([...cardsToDelete, cardId]);
    setEditedDeck({
      ...editedDeck,
      cards: editedDeck.cards.filter(card => card._id !== cardId),
    });
  };

  return (
    <div className="p-6 bg-gray-100">
      <div className="flex justify-between items-center mb-4">
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={editedDeck.name}
            onChange={handleChange}
            className="text-2xl font-bold mb-4 p-2 rounded-md shadow-lg"
          />
        ) : (
          <div className="text-2xl font-bold">{deck.name}</div>
        )}
        <div className="flex space-x-2">
          <button
            onClick={isEditing ? handleSaveClick : handleEditClick}
            className="bg-black text-white py-1 px-3 rounded-lg hover:opacity-80 transition border-neutral-300 focus:border-black text-md font-semibold border-2"
          >
            {isEditing ? 'Save' : 'Edit'}
          </button>
          {isEditing && (
            <button
              onClick={handleDeleteClick}
              className="bg-black text-white py-1 px-3 rounded-lg hover:opacity-80 transition border-neutral-300 focus:border-black text-md font-semibold border-2"
            >
              Delete
            </button>
          )}
        </div>
      </div>
      <div className="mb-6">
        {isEditing ? (
          <input
            type="text"
            name="category"
            value={editedDeck.category}
            onChange={handleChange}
            className="text-gray-700 text-base mb-4 p-2 rounded-md shadow-lg"
          />
        ) : (
          <div className="text-gray-700 text-base">Category: {deck.category}</div>
        )}
      </div>
      <div className="grid grid-cols-1 gap-6">
        {editedDeck.cards.map((card, index) => (
          <div key={card._id} className="max-w-4xl rounded-xl overflow-hidden shadow-lg p-4 bg-white mb-4 relative">
            {isEditing && (
              <TrashIcon
                className="cursor-pointer absolute top-3 right-4 h-6 w-6 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                onClick={() => handleCardDeleteClick(card._id)}
              />
            )}
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="title"
                  value={editedDeck.cards[index].title}
                  onChange={(e) => handleCardChange(index, e)}
                  className="text-gray-700 font-bold text-l mb-2 w-full"
                />
                <textarea
                  name="body"
                  value={editedDeck.cards[index].body}
                  onChange={(e) => handleCardChange(index, e)}
                  className="text-gray-700 text-l w-full"
                />
              </>
            ) : (
              <div className="flex items-start">
                <div className="w-1/4 mr-4">
                  <div className="text-gray-700 font-bold text-l mb-2">{card.title}</div>
                </div>
                <div className="inline-block h-auto w-0.5 self-stretch bg-gray-700 dark:bg-gray-700/6 mr-5"></div>
                <div className="w-3/4">
                  <div className="text-gray-700 text-l">{card.body}</div>
                </div>
              </div>
            )}
          </div>
        ))}
        {newCards.map((card, index) => (
          <div key={index} className="max-w-4xl rounded-xl overflow-hidden shadow-lg p-4 bg-white mb-4 relative">
            <TrashIcon
              className="cursor-pointer absolute top-3 right-4 h-6 w-6 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
              onClick={() => handleRemoveNewCard(index)}
            />
            <input
              type="text"
              name="title"
              value={card.title}
              onChange={(e) => handleNewCardChange(index, e)}
              className="text-gray-700 font-bold text-l mb-2 w-full"
              placeholder="New card title"
            />
            <textarea
              name="body"
              value={card.body}
              onChange={(e) => handleNewCardChange(index, e)}
              className="text-gray-700 text-l w-full"
              placeholder="New card body"
            />
          </div>
        ))}
        {isEditing && (
          <div className="flex justify-center">
            <PlusCircleIcon
              className="cursor-pointer h-9 w-9 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
              onClick={handleAddNewCard}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DeckDetail;