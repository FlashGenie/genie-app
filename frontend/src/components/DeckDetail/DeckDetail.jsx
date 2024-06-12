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
      <div className="ml-24 text-2xl font-bold mb-4">{deck.name}</div>
      <div className="ml-24 text-gray-700 text-base mb-6">Category: {deck.category}</div>
      <div className="ml-24 grid grid-cols-1 gap-6">
        {deck.cards.map((card) => (
          <div key={card._id} className="max-w-4xl rounded-xl overflow-hidden shadow-lg p-4 bg-white mb-4 ml-0">
            <div className="flex items-start">
              <div className="w-1/4 mr-4">
                <div className="text-gray-700 font-bold text-l mb-2">{card.title}</div>
              </div>
              <div className="inline-block h-auto w-0.5 self-stretch bg-gray-700 dark:bg-gray-700/6 mr-5" style={{ height: 'auto' }}></div>
              <div className="w-3/4">
                <div className="text-gray-700 text-l">{card.body}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeckDetail;


