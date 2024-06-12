import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchDeck, editDeck, removeDeck } from '../../store/decks';

const DeckDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deck = useSelector(state => state.decks[id]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDeck, setEditedDeck] = useState(null);
  const [newCard, setNewCard] = useState({ title: '', body: '' });
  const [showAddCard, setShowAddCard] = useState(false);

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

  if (!deck) {
    return <div>Loading...</div>;
  }

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    dispatch(editDeck(id, editedDeck));
    setIsEditing(false);
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

  const handleAddCard = () => {
    const newCards = [...editedDeck.cards, newCard];
    setEditedDeck({ ...editedDeck, cards: newCards });
    setNewCard({ title: '', body: '' });
    setShowAddCard(false);
  };

  const toggleAddCard = () => {
    setShowAddCard(!showAddCard);
    if (!showAddCard) {
      setNewCard({ title: '', body: '' });
    }
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
            className="text-sm bg-blue-500 text-white py-1 px-3 rounded"
          >
            {isEditing ? 'Save' : 'Edit'}
          </button>
          {isEditing && (
            <button
              onClick={handleDeleteClick}
              className="mr-25 text-sm bg-red-500 text-white py-1 px-3 rounded"
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
        {deck.cards.map((card, index) => (
          <div key={card._id} className="max-w-4xl rounded-xl overflow-hidden shadow-lg p-4 bg-white mb-4">
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
        {isEditing && (
          <>
          <div className="flex justify-center">
            <button
              onClick={toggleAddCard}
              className="text-sm bg-green-500 text-white py-1 px-3 rounded"
            >
              {showAddCard ? '-' : '+'}
            </button>
          </div>
          {showAddCard && (
            <div className="max-w-4xl rounded-xl overflow-hidden shadow-lg p-4 bg-white mb-4">
              <input
                type="text"
                name="title"
                value={newCard.title}
                onChange={(e) => setNewCard({ ...newCard, title: e.target.value })}
                placeholder="New card title"
                className="text-gray-700 font-bold text-l mb-2 w-full"
              />
              <textarea
                name="body"
                value={newCard.body}
                onChange={(e) => setNewCard({ ...newCard, body: e.target.value })}
                placeholder="New card body"
                className="text-gray-700 text-l w-full"
              />
              <button
                onClick={handleAddCard}
                className="text-sm bg-green-500 text-white py-1 px-3 rounded mt-2"
              >
                Add Card
              </button>
            </div>
          )}
          </>
        )}
        
      </div>
    </div>
  );
};

export default DeckDetail;
