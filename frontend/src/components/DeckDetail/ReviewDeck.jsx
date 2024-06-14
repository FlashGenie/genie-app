import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from 'react-icons/hi';
import { useLocation } from 'react-router-dom';
import { FaExpandArrowsAlt, FaCompressArrowsAlt } from "react-icons/fa";

const ReviewDeck = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const deck = useSelector((state) => state.decks[id]);
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
        if (location.pathname === `/decks/${id}/review`) {
            navigate(-1);
        } else {
            navigate(`/decks/${id}/review`);
        }
    };

    if (!deck || !deck.cards.length) return <div>Deck not found or empty.</div>;

    const cardWidth = location.pathname === `/decks/${id}/review` ? 'w-[1024px]' : 'w-[800px]';
    const cardHeight = location.pathname === `/decks/${id}/review` ? 'h-[580px]' : 'h-[428px]';

    return (
        <div className='flex flex-col justify-center items-center bg-gray-100 w-full'>
            <div className={`flex flex-col w-2/3 justify-start items-center mt-10 mb-20 `}>
                <div className={`bg-white ${cardWidth} ${cardHeight} border rounded-xl shadow-sm flex justify-center items-center px-8 py-6`} onClick={toggleCardBody}>
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
                        <HiOutlineArrowSmLeft className='h-6 w-6' />
                    </button>
                    <p className='text-lg px-6 text-slate-500 font-medium'>
                        {currentCardIndex + 1} / {deck.cards.length}
                    </p>
                    <button
                        className={`px-4 py-2 rounded-md ${currentCardIndex === deck.cards.length - 1 ? 'bg-gray-300 text-gray-500' : 'bg-slate-500 text-white'}`}
                        onClick={handleNextCard}
                        disabled={currentCardIndex === deck.cards.length - 1}
                    >
                        <HiOutlineArrowSmRight className='h-6 w-6' />
                    </button>
                    <button
                        onClick={handleClose}
                        className="
                            p-1
                            rounded-2xl
                            bg-gray-100
                            hover:opacity-50
                            transition
                            ml-4
                        "
                    >
                        {location.pathname === `/decks/${id}` ? (
                            <FaExpandArrowsAlt size={24} />
                        ) : (
                            <FaCompressArrowsAlt size={24} />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewDeck;