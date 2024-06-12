import jwtFetch from "./jwt";

const RECEIVE_DECKS = "deck/RECEIVE_DECKS";
const RECEIVE_DECK = "deck/RECEIVE_DECK";
const CLEAR_DECKS = "deck/CLEAR_DECKS";

// Actions
export const receiveDecks = decks => ({
    type: RECEIVE_DECKS,
    decks
})

export const receiveDeck = deck => ({
  type: RECEIVE_DECK,
  deck
});

export const clearDecks = () => ({
  type: CLEAR_DECKS
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

export const fetchDeck = (id) => async dispatch => {
  try {
      const response = await jwtFetch(`/api/decks/${id}`); // Replace with your API endpoint
      const data = await response.json();
      dispatch(receiveDecks({ [id]: data }));
  } catch (error) {
      console.error("Failed to fetch deck:", error);
  }
};

// window.fetchDecks = fetchDecks;

export const decksReducer = (state = {}, action) => {
    switch(action.type) {
      case RECEIVE_DECKS:
        return {...state, ...action.decks};
      case RECEIVE_DECK:
        return { ...state, [action.deck._id]: action.deck };
      case CLEAR_DECKS:
        return {};
      default:
        return state;
    }
};


export default decksReducer;