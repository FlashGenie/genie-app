import Sidebar from '../Dashboard/Sidebar';
import {useEffect, useState} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {fetchDecks} from  '../../store/decks';
import FlashcardSet from '../Dashboard/FlashcardSet';
import Modal from '../Modal/Modal'
import { useNavigate } from 'react-router-dom';

function Explore() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
 
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
    const popularDecks = popularDecksSort.slice(0,8)

    return(
        <div className = "flex w-full">
            <div className="flex-grow p-6 bg-gray-100">
                <div className="text-3xl font-bold mb-8">Explore</div>
                <div className="text-2xl font-bold mb-4">New and Notable</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {recentDecks.map((set) => (
                    <FlashcardSet
                    key={set._id}
                    title={set.name}
                    termCount={set.cards.length}
                    username={set.authorName ? set.authorName: 'Unknown'}
                    //this fav button below if is true the heart will show up on the flash card if is false not
                    // fav={true}   
                    onClick={() => handleFlashcardSetClick(set._id)}
                    />
                ))}
                </div>

                <div className="text-2xl font-bold mb-4 mt-20">Popular Today</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {popularDecks.map((set) => (
                    <FlashcardSet
                    key={set._id}
                    title={set.name}
                    termCount={set.cards.length}
                    username={set.authorName ? set.authorName: 'Unknown'}
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