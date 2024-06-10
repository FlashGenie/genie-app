const OPEN_REGISTER_MODAL = 'modal/openRegisterModal';
const CLOSE_REGISTER_MODAL = 'modal/closeRegisterModal';
const OPEN_LOGIN_MODAL = 'modal/openLoginModal';
const CLOSE_LOGIN_MODAL = 'modal/closeLoginModal';

export const openRegisterModal = () => ({
    type: OPEN_REGISTER_MODAL
});

export const closeRegisterModal = () => ({
    type: CLOSE_REGISTER_MODAL
});

export const openLoginModal = () => ({
    type: OPEN_LOGIN_MODAL
});

export const closeLoginModal = () => ({
    type: CLOSE_LOGIN_MODAL
});

const initialState = {
    isLoginOpen: false,
    isRegisterOpen: false
};

function modalReducer(state = initialState, action) {
    switch (action.type) {
        case OPEN_REGISTER_MODAL:
            return {
                ...state,
                isRegisterOpen: true
            };
        case CLOSE_REGISTER_MODAL:
            return {
                ...state,
                isRegisterOpen: false
            };
        case OPEN_LOGIN_MODAL:
            return {
                ...state,
                isLoginOpen: true
            };
        case CLOSE_LOGIN_MODAL:
            return {
                ...state,
                isLoginOpen: false
            };
        default:
            return state;
    }
}

export default modalReducer