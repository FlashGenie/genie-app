import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeGenerateDeckModal } from '../../store/modal';
import { createDeck } from '../../store/decks';
import { useNavigate } from 'react-router-dom';

const GenerateDeckModal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isGenerateDeckOpen = useSelector((state) => state.modal.isGenerateDeckOpen);
    const flashcards = useSelector((state) => state.modal.flashcards);
    const [ title, setTitle ] = useState('');
    const [ category, setCategory ] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !category) {
            return;
        }
        
        const deckData = {
            name: title,
            category: category,
            cards: flashcards,
            genieCreated: true
        };

        console.log(deckData);

        const response = dispatch(createDeck(deckData));

        if (response) {
            dispatch(closeGenerateDeckModal());
            navigate('/dashboard');
            setTitle('')
            setCategory('')
        } else {
            // handle error
        }
    }

    return (
        isGenerateDeckOpen && (
            <div className="modal">
                <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/80">
                    <div className="relative w-2/6 my-6 mx-auto h-auto">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none py-8 px-10"> 
                            <form className="flex flex-col items-center" onSubmit={handleSubmit}>
                                {/* HEADER */}
                                <div className="flex flex-col items-center justify-center relative mb-6">
                                    <h2 className="text-2xl font-bold center">
                                        Deck created successfully!
                                    </h2>
                                </div>
                                {/* BODY */}
                                <div className="w-full relative mb-4">
                                    <input
                                        className='peer w-full p-4 pt-6 font-light bg-white border-2 rounded-lg outline-none transition pl-4  border-neutral-300'
                                        type="text"
                                        placeholder=" "
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                    <label 
                                        className='
                                            absolute 
                                            text-sm
                                            duration-150 
                                            transform 
                                            -translate-y-3 
                                            top-5 
                                            z-10 
                                            origin-[0] 
                                            left-4
                                            peer-placeholder-shown:scale-125 
                                            peer-placeholder-shown:translate-y-1
                                            peer-focus:scale-100
                                            peer-focus:-translate-y-3
                                            text-zinc-400
                                        '
                                    >
                                        Title
                                    </label>
                                </div>
                                <div className="w-full relative">
                                    <input
                                        className='peer w-full p-4 pt-6 font-light bg-white border-2 rounded-lg outline-none transition pl-4  border-neutral-300'
                                        type="text"
                                        placeholder=" "
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        required
                                    />
                                    <label 
                                        className='
                                            absolute 
                                            text-sm
                                            duration-150 
                                            transform 
                                            -translate-y-3 
                                            top-5 
                                            z-10 
                                            origin-[0] 
                                            left-4
                                            peer-placeholder-shown:scale-125 
                                            peer-placeholder-shown:translate-y-1
                                            peer-focus:scale-100
                                            peer-focus:-translate-y-3
                                            text-zinc-400
                                        '
                                    >
                                        Category
                                    </label>
                                </div>
                                <button 
                                    type="submit"
                                    className='rounded-lg w-full bg-black text-white py-3 text-md font-semibold mt-6'
                                >
                                    Save Deck
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default GenerateDeckModal;
