import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchDeck } from '../../store/decks';

const DeckDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const deck = useSelector(state => state.decks[id]);

  useEffect(() => {
    if (id) {
      dispatch(fetchDeck(id));
    }
  }, [dispatch, id]);

  if (!deck) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-100">
      <div className="text-2xl font-bold mb-4">{deck.name}</div>
      <div className="text-gray-700 text-base mb-6">Category: {deck.category}</div>
      <div className="grid grid-cols-1 gap-6">
        {deck.cards.map((card) => (
          <div key={card._id} className="max-w-full rounded overflow-hidden shadow-lg p-4 bg-white mb-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1">
                <div className="font-bold text-xl mb-2">{card.title}</div>
              </div>
              <div className="col-span-1">
                <div className="text-gray-700 text-base">{card.body}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeckDetail;
