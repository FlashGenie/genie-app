import { useDispatch, useSelector } from 'react-redux';
import { closeGenerateDeckModal } from '../../store/modal';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';

const GenerateDeckModal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isGenerateDeckOpen = useSelector((state) => state.modal.isGenerateDeckOpen);

    const handleContinue = () => {
        navigate('/dashboard');
        dispatch(closeGenerateDeckModal());
    };

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <p className="text-center">Your deck has been successfully generated!</p>
            <button 
                onClick={handleContinue}
                className='
                    relative 
                    disabled:opacity-70
                    disabled:cursor-not-allowed
                    rounded-lg
                    hover:opacity-80
                    transition
                    w-full
                    bg-black
                    border-neutral-300
                    focus:border-black
                    text-white
                    py-3
                    text-md
                    font-semibold
                    border-2
                    mt-6
                '
            >
                Continue
            </button>
        </div>
    );

    return (
        <Modal 
            isOpen={isGenerateDeckOpen}
            body={bodyContent}
            hideCloseButton={true}
			hideBorder={true} 
        />
    );
};

export default GenerateDeckModal;
