import Sidebar from './Sidebar'
import FlashcardSet from './FlashcardSet';
function Dashboard() {

    const flashcardSets = [
        { title: 'Biology 101', termCount: 50, username: 'user1' },
        { title: 'History of Art', termCount: 30, username: 'user2' },
        { title: 'Chemistry Basics', termCount: 20, username: 'user3' },
        { title: 'Computer Science', termCount: 20, username: 'user4' },
        { title: 'Haleluia', termCount: 100, username: 'user5' },
    ];
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