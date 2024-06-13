import jwtFetch from "./jwt";

const RECEIVE_DECKS = "deck/RECEIVE_DECKS";
const RECEIVE_DECK = "deck/RECEIVE_DECK";
const CLEAR_DECKS = "deck/CLEAR_DECKS";
const DELETE_DECK = "deck/DELETE_DECK";
const DELETE_DECK_CARD = "deck/DELETE_DECK_CARD"

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

export const deleteDeck = deckId => ({
  type: DELETE_DECK,
  deckId
});

export const deleteDeckCard = (deckId, cardId) => ({
  type: DELETE_DECK_CARD,
  deckId,
  cardId
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

export const createDeck = (deckData) => async dispatch => {
  try {
      const response = await jwtFetch('/api/decks/new', {
          method: 'POST',
          body: JSON.stringify(deckData)
      });
      const data = await response.json();
      dispatch(receiveDeck(data));
  } catch (error) {
      console.error("Failed to create deck:", error);
  }
};

export const editDeck = (id, deckData) => async dispatch => {
  try {
      const response = await jwtFetch(`/api/decks/${id}`, {
          method: 'PATCH',
          body: JSON.stringify(deckData)
      });
      const data = await response.json();
      dispatch(receiveDeck(data));
  } catch (error) {
      console.error("Failed to update deck:", error);
  }
};

export const removeDeck = (id) => async dispatch => {
  try {
      await jwtFetch(`/api/decks/${id}`, { method: 'DELETE' });
      dispatch(deleteDeck(id));
  } catch (error) {
      console.error("Failed to delete deck:", error);
  }
};

export const removeDeckCard = (deckId, cardId) => async dispatch => {
  try {
    await jwtFetch(`/api/cards/${cardId}`, {method: 'DELETE'});
    dispatch(deleteDeckCard(deckId, cardId));
  } catch (error) {
    console.error("Failed to delete card:", error);
  }
}

window.deckActions = {
  fetchDecks,
  fetchDeck,
  createDeck,
  editDeck,
  removeDeck,
  clearDecks,
  removeDeckCard
};

export const decksReducer = (state = {}, action) => {
    const newState = { ...state };
    switch(action.type) {
      case RECEIVE_DECKS:
        return {...state, ...action.decks};
      case RECEIVE_DECK:
        return { ...state, [action.deck._id]: action.deck };
      case DELETE_DECK:
        delete newState[action.deckId];
        return newState;
      case DELETE_DECK_CARD:
        newState[action.deckId].cards = newState[action.deckId].cards.filter(card => card._id != action.cardId);
        return newState;
      case CLEAR_DECKS:
          return {};
      default:
        return state;
    }
};


export default decksReducer;