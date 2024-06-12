import jwtFetch from "./jwt";

const RECEIVE_DECKS = "deck/RECEIVE_DECKS";

// Actions
export const receiveDecks = decks => ({
    type: RECEIVE_DECKS,
    decks
})

export const fetchDecks = () => async dispatch => {
  try {
      const response = await jwtFetch('/api/decks'); // Replace with your API endpoint
      const data = await response.json();
      dispatch(receiveDecks(data));
  } catch (error) {
      console.error("Failed to fetch decks:", error);
  }
};

window.fetchDecks = fetchDecks;

export const decksReducer = (state = {}, action) => {
    switch(action.type) {
      case RECEIVE_DECKS:
        return {...state, ...action.decks};
      default:
        return state;
    }
};


export default decksReducer;