import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate} from 'react-router-dom';
import { HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from "react-icons/hi";
import { IoMdClose } from 'react-icons/io'

const ReviewDeck = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const deck = useSelector(state => state.decks[id]);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isCardBodyVisible, setIsCardBodyVisible] = useState(false);

    const handleNextCard = () => {
        setCurrentCardIndex((prevIndex) =>
            prevIndex < deck.cards.length - 1 ? prevIndex + 1 : prevIndex
        );

        setIsCardBodyVisible(false);
    };

    const handlePrevCard = () => {
        setCurrentCardIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : prevIndex
        );

        setIsCardBodyVisible(false);
    };

    const toggleCardBody = () => {
        setIsCardBodyVisible(!isCardBodyVisible);
    };

    const handleClose = () => {
        navigate(-1);
    };

    if (!deck || !deck.cards.length) return <div>Deck not found or empty.</div>;

    return (
        <div className='flex flex-col justify-center items-center'>
            <div className='flex flex-col w-2/3 justify-center items-center mt-20'>
                <div className='w-[812px] h-[428px] border rounded-xl shadow-sm flex justify-center items-center px-8 py-6' onClick={toggleCardBody}>
                    {isCardBodyVisible ? (
                        <p className='text-center text-xl font-sans'>{deck.cards[currentCardIndex].body}</p> 
                    ) : (
                        <h2 className='text-3xl font-semibold'>{deck.cards[currentCardIndex].title}</h2>
                    )}
                </div>
                <div className='flex mt-8 items-center'>
                    <button 
                        className={`px-4 py-2 rounded-md ${currentCardIndex === 0 ? 'bg-gray-300 text-gray-500' : 'bg-slate-500 text-white'}`}
                        onClick={handlePrevCard}
                        disabled={currentCardIndex === 0}
                    >
                        <HiOutlineArrowSmLeft className='h-6 w-6'/>
                    </button>
                    <p className='text-lg px-6 text-slate-500 font-medium'>
                        {currentCardIndex + 1} / {deck.cards.length}
                    </p>
                    <button 
                        className={`px-4 py-2 rounded-md ${currentCardIndex === deck.cards.length - 1 ? 'bg-gray-300 text-gray-500' : 'bg-slate-500 text-white'}`}
                        onClick={handleNextCard}
                        disabled={currentCardIndex === deck.cards.length - 1}
                    >
                        <HiOutlineArrowSmRight className='h-6 w-6'/>
                    </button>
                </div>
            </div>
            <button
                onClick={handleClose}
                className="
                    p-1
                    border
                    rounded-2xl
                    bg-gray-200
                    hover:opacity-50
                    transition
                    absolute
                    right-9
                    top-28
                "
            >
                <IoMdClose size={18}/>
            </button>
        </div>
    );
}

export default ReviewDeck;