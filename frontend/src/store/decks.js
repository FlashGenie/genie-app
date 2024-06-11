// import jwtFetch from "./jwt";

const RECEIVE_DECKS = "deck/RECEIVE_DECKS";

// Actions
export const receiveDecks = decks => ({
    type: RECEIVE_DECKS,
    decks
})



export const decksReducer = (state = {}, action) => {
    switch(action.type) {
      case RECEIVE_DECKS:
        return {...state, ...action.decks};
      default:
        return state;
    }
};

export default decksReducer;