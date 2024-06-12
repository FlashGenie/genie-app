import { useDispatch } from 'react-redux';
import { openRegisterModal } from '../../store/modal';

function Conversion() {
    const dispatch = useDispatch();

    const handleOpenRegisterModal = () => {
        dispatch(openRegisterModal());
    }

    return(
        <section id="conversion" className='mb-10 pt-40'>
            <div className='flex flex-col justify-center items-center'>
                <img className="w-80 -ml-2 relative animate-updown" src='logo.svg'/>
                <div className="pt-10 flex flex-col items-center font-sans mb-28 lg:px-40">
                    <h1 className="font-bold text-5xl text-center leading-none mb-4">
                        Ready to Transform Your Study Routine?
                    </h1>
                    <p className="text-gray-600 pb-5 text-2xl font-light tracking-wider text-center mb-4">
                        Unlock the power of AI-generated flashcards and make studying more efficient with Genie. Join our 
                        community of learners today and take the first step towards mastering your subjects with ease.
                    </p>
                    <button onClick={handleOpenRegisterModal} className="bg-black text-white font-medium text-lg px-8 py-2.5 rounded-lg">Sign Up for Free</button>
                </div>
            </div>
        </section>
    )
}

export default Conversion;