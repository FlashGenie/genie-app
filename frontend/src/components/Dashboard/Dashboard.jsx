import Sidebar from './Sidebar'
import FlashcardSet from './FlashcardSet';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDecks } from '../../store/decks';

function Dashboard() {
    const dispatch = useDispatch();
    const decks = useSelector(state => state.decks);

    useEffect(() => {
        dispatch(fetchDecks());
    }, [dispatch]);

    const flashcardSets = Object.values(decks).map(deck => ({
        title: deck.name,
        termCount: deck.cards.length,
        username: deck.author.username // Adjust based on your API response structure
    }));

    return(
        // <Sidebar/>
        <div className="flex">
        <Sidebar />
        <div className="flex-grow p-6 bg-gray-100">
          <div className="text-2xl font-bold mb-4">Dashboard</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {flashcardSets.map((set, index) => (
              <FlashcardSet
                key={index}
                title={set.title}
                termCount={set.termCount}
                username={set.username}
              />
            ))}
          </div>
        </div>
      </div>

    )
}

export default Dashboard;