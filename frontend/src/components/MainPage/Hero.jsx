import { useDispatch } from 'react-redux';
import { openRegisterModal } from '../../store/modal';

function Hero() {
    const dispatch = useDispatch();

    const handleOpenRegisterModal = () => {
        dispatch(openRegisterModal());
    }

    return(
        <section id="hero" className='mb-60'>
            <div className="pt-40 flex flex-col items-center font-sans mb-28 px-20">
                <h1 className="font-bold text-[4.2rem] 2xl:text-[4.5rem] text-center leading-none mb-8">
                    AI-Powered Flashcards<img src="flashcard.svg" className="w-40 px-1 inline relative -mt-8"/>from your notes, made effortless
                </h1>
                <p className="text-gray-600 pb-5 text-2xl font-light tracking-wider mb-4">Create, Study, Explore, and Share: A Community of Flashcards</p>
                <button onClick={handleOpenRegisterModal} className="bg-black text-white font-medium text-lg px-8 py-2.5 rounded-lg hover:bg-slate-800">Get Started</button>
            </div>
            <div className='mb-20'>
                <img src="dashboard.jpg" className="w-full border rounded-xl drop-shadow-xl"/>
            </div>
        </section>
    )
}

export default Hero;