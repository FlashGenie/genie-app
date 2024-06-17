import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar(){
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");

    const updateSearch = (e) =>{
        setSearchTerm(e.target.value)
    }

    const goSearch = (e)=>{
        e.preventDefault()
        navigate('/search', {state:{searchTerm}})
    }
    return(
        <>
        <form onSubmit = {goSearch}>
            <input type="text" className="h-14 font-bold w-1/2 mb-4 pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none" placeholder="Search for a flashcard deck..." onChange = {updateSearch}/>
            <button type="submit" className="bg-white hover:bg-grey rounded py-4 px-6 ml-8" onClick={goSearch}>Search</button>
        </form>
          </>
        
    )
}

export default SearchBar