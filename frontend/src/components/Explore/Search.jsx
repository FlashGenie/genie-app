import { useLocation, useNavigate } from 'react-router-dom'
import {useState, useEffect} from 'react'
import { searchDecks } from '../../store/decks';
import {useDispatch, useSelector} from 'react-redux'
import SearchBar from './SearchBar'
import Sidebar from '../Dashboard/Sidebar';
import FlashcardSet from '../Dashboard/FlashcardSet';

function Search(){
    const dispatch = useDispatch();
    const location = useLocation();
    const searchTerm = location.state.searchTerm
    const [results, setResults] = useState([]);
    const navigate = useNavigate();
    const allFavorites = useSelector(state => Object.values(state.favorites));

    useEffect(() => {
        const fetchResults = async () => {
            if (searchTerm) {
                debugger;
                try {
                    const resultsObject = await dispatch(searchDecks(searchTerm));
                    const resultsArray = Object.values(resultsObject);
                    setResults(resultsArray);
                } catch (error) {
                    console.error('Error fetching search results:', error);
                }
            }
        };

        fetchResults();
        console.log(results)
    }, [dispatch, searchTerm]);
    

    const handleFlashcardSetClick = (id) => {
        navigate(`/decks/${id}`);
      };

      const handleFav = (deckId) => {
        const array = []
    
        allFavorites.forEach((favorite) => {
          array.push(favorite.deck)
        })
    
        if (array.includes(deckId)) {
          return true
        } else {
          return false
        }
      };

    let resCountIntro
    
    if (results.length === 1){
         resCountIntro = "There is 1 result"
    } else {
         resCountIntro = `There are ${results.length} results`
    }
    return(
  
            <div className="flex-grow p-6 bg-gray-100 min-h-screen-minus-80">
                <SearchBar />
                <div className="text-3xl font-bold mb-4">{resCountIntro} for search term: {searchTerm} </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {results.map((set) => (
                    <FlashcardSet
                    key={set._id}
                    deckId={set._id}
                    title={set.name}
                    termCount={set.cards.length}
                    username={set.authorName ? set.authorName: 'Unknown'}
                    genieCreated={set.genieCreated}
                    initialFav={handleFav(set._id)}   
                    //this fav button below if is true the heart will show up on the flash card if is false not
                    // fav={true}   
                    onClick={() => handleFlashcardSetClick(set._id)}
                    />
                ))}

                </div>
               

            </div>
            

     
    )
}

export default Search;