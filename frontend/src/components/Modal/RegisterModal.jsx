import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeRegisterModal } from '../../store/modal';
import * as sessionActions from '../../store/session';
import Modal from './Modal';
// import { IconContext } from "react-icons";
import { FaCircleXmark } from "react-icons/fa6";
import { clearSessionErrors } from '../../store/session';

const RegisterModal = () => {
    const dispatch = useDispatch();
    const isRegisterOpen = useSelector((state) => state.modal.isRegisterOpen);
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState('');
    const [username, setUsername] = useState("");
    const errors = useSelector(state => state.errors.session);
    const [localErrors, setLocalErrors] = useState([]);

    const resetFields = () => {
        setUsername('');
        setEmail('');
        setPassword('');
        setPassword2('');
        setLocalErrors([]);
    };

    const onClose = () => {
        dispatch(closeRegisterModal());
        dispatch(clearSessionErrors());
        setLocalErrors([]);
    }

    useEffect(() => {
        if (sessionUser) {
            console.log('User is logged in');
            dispatch(closeRegisterModal())
        }
    }, [dispatch, sessionUser]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // if (password) {
        // //   setErrors([]);
        //   return dispatch(sessionActions.signup({ email, username, password }))
        // }
        if (password !== password2) {
            setLocalErrors(['Confirm Password field must match']);
            return;
        }
        setLocalErrors([]);
        return dispatch(sessionActions.signup({ email, username, password }))
    };

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <div className="text-2xl font-bold center">
                Welcome to Genie.
            </div>
            <form onSubmit={handleSubmit}>
                <div className='mb-5'>
                    <div className="w-full relative">
                        <input
                                className='
                                    peer
                                    w-full
                                    p-4
                                    pt-6 
                                    font-light 
                                    bg-white 
                                    border-2
                                    rounded-lg
                                    outline-none
                                    transition
                                    disabled:opacity-70
                                    disabled:cursor-not-allowed
                                    pl-4
                                    border-neutral-300
                                    focus:border-black
                                '
                                placeholder=" "
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
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
                            Username
                        </label>
                    </div>
                </div>
                <div className='"w-full mb-5 relative'>
                    <input
                        className='
                            peer
                            w-full
                            p-4
                            pt-6 
                            font-light 
                            bg-white 
                            border-2
                            rounded-lg
                            outline-none
                            transition
                            disabled:opacity-70
                            disabled:cursor-not-allowed
                            pl-4
                            border-neutral-300
                            focus:border-black
                        '
                        type="text"
                        placeholder=" "
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        Email
                    </label>
                </div>
                <div className='"w-full mb-5 relative'>
                    <input
                        className='
                            peer
                            w-full
                            p-4
                            pt-6 
                            font-light 
                            bg-white 
                            border-2
                            rounded-lg
                            outline-none
                            transition
                            disabled:opacity-70
                            disabled:cursor-not-allowed
                            pl-4
                            border-neutral-300
                            focus:border-black
                        '
                        type="password"
                        placeholder=" "
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                        Password
                    </label>
                </div>
                <div className='"w-full relative'>
                    <input
                        className='
                            peer
                            w-full
                            p-4
                            pt-6 
                            font-light 
                            bg-white 
                            border-2
                            rounded-lg
                            outline-none
                            transition
                            disabled:opacity-70
                            disabled:cursor-not-allowed
                            pl-4
                            border-neutral-300
                            focus:border-black
                        '
                        type="password"
                        placeholder=" "
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
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
                        Confirm Password
                    </label>
                </div>
                
                {errors && Object.values(errors).length > 0 && (
                <ul className='text-red-600 mt-1'>
                    {Object.values(errors).map((error, index) => (
                        <li key={index} className='text-xs font-semibold flex gap-2 items-center'>
                            <FaCircleXmark /> 
                            {error}
                        </li>
                    ))}
                </ul>
                )}
                {localErrors.length > 0 && (
                    <ul className='text-red-600 mt-1'>
                        {localErrors.map((error, index) => (
                            <li key={index} className='text-xs font-semibold flex gap-2 items-center'>
                                <FaCircleXmark /> 
                                {error}
                            </li>
                        ))}
                    </ul>
                )}
                <button 
                    type="submit"
                    disabled={!email || !username || !password}
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
                    Agree and Continue 
                </button>
            </form>
        </div>
    )

    return (
        <Modal 
            // disabled={isLoading}
            isOpen={isRegisterOpen}
            title="Register"
            onClose={onClose}
            resetFields={resetFields}
            body={bodyContent}
        />
    )
}

export default RegisterModal;