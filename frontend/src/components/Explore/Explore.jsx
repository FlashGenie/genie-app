import Sidebar from '../Dashboard/Sidebar';
import {useEffect, useState, useRef} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {fetchDecks} from  '../../store/decks';
import FlashcardSet from '../Dashboard/FlashcardSet';
import Modal from '../Modal/Modal'
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Import left and right icons


function Explore() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showChevrons, setShowChevrons] = useState(false);
    
    const scrollRef = useRef(null);

    const handleScroll = (scrollOffset) => {
        const element = scrollRef.current;
        if (element) {
            element.scrollTo({
                left: element.scrollLeft + scrollOffset *2,
                behavior: 'smooth',
            });
        }
    };
 
    useEffect(()=>{
        dispatch(fetchDecks())
    },[dispatch]
      )
    const allDecks = useSelector(state=>Object.values(state.decks))

   
      const handleFlashcardSetClick = (id) => {
        navigate(`/decks/${id}`);
      };
   
    let recentDecksSort = allDecks.sort((a,b)=>{    
        return new Date(b.createdAt) - new Date(a.createdAt)
    })
    const recentDecks = recentDecksSort.slice(0,8)
    allDecks.reverse();
    let popularDecksSort =  allDecks.sort((a,b)=>{
        return b.favoriteCount - a.favoriteCount
    })
    const popularDecks = popularDecksSort.slice(0,24)
    debugger;

    return(
        <div className = "flex w-full">
            <div className="flex-grow p-6 bg-gray-100">
                <div className="text-3xl font-bold mb-4">Explore</div>
                <SearchBar />
                <div className="text-2xl font-bold mb-4">New and Notable</div>
                <div 
                    className="relative"
                    onMouseEnter={() => setShowChevrons(true)}
                    onMouseLeave={() => setShowChevrons(false)}>
                <div className="flex flex-nowrap overflow-x-auto -mx-3" ref={scrollRef}>
                    {recentDecks.map((set) => (
                        <div className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-1" key={set._id}>
                            <div className="hover:scale-110 p-4">
                            <FlashcardSet
                                title={set.name}
                                termCount={set.cards.length}
                                username={set.authorName ? set.authorName : 'Unknown'}
                                genieCreated={set.genieCreated}
                                onClick={() => handleFlashcardSetClick(set._id)}
                            />

                            </div>
                           
                        </div>
                    ))}
                </div>
                {/* Scroll Buttons */}
                <button
                        className={`absolute top-0 bottom-0 left-0 flex items-center justify-center bg-gray-300 text-gray-500 w-12 h-full z-10 transition-opacity duration-300 ${
                            showChevrons ? 'opacity-70' : 'opacity-0'
                        }`}
                        onClick={() => handleScroll(-200)} // Scroll left
                        style={{ left: 0 }}
                    >
                        <FaChevronLeft />
                    </button>
                    <button
                        className={`absolute top-0 bottom-0 right-0 flex items-center justify-center bg-gray-300 text-gray-500 w-12 h-full z-10 transition-opacity duration-300 ${
                            showChevrons ? 'opacity-70' : 'opacity-0'
                        }`}
                        onClick={() => handleScroll(200)} // Scroll right
                        style={{ right: 0 }}
                    >
                        <FaChevronRight />
                    </button>
            </div>
                

                <div className="text-2xl font-bold mb-4 mt-20">Popular Today</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {popularDecks.map((set) => (
                    <FlashcardSet
                    key={set._id}
                    title={set.name}
                    termCount={set.cards.length}
                    username={set.authorName ? set.authorName: 'Unknown'}
                    genieCreated={set.genieCreated}
                    //this fav button below if is true the heart will show up on the flash card if is false not
                    // fav={true}   
                    onClick={() => handleFlashcardSetClick(set._id)}
                    />
                ))}
                </div>
              
            </div>
        </div>
    )
}

export default Explore;


