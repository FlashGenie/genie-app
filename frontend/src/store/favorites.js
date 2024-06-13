import jwtFetch from "./jwt";

const GET_FAVORITES = "deck/GET_FAVORITES";
const CREATE_FAVORITE = "deck/CREATE_FAVORITE";
const DELETE_FAVORITE = "deck/DELETE_FAVORITE";


//////
export const getFavorites = favorites => ({
    type: GET_FAVORITES,
    favorites
})

export const addFavorite = favorite => ({
    type: CREATE_FAVORITE,
    favorite
})

export const deleteFavorite = favoriteId => ({
    type: DELETE_FAVORITE,
    favoriteId
})


///////
export const fetchFavorites = (userId) => async dispatch => {
  try {
      const response = await jwtFetch(`/api/favorites/user/${userId}`); // Replace with your API endpoint
      const data = await response.json();
      dispatch(getFavorites(data));
  } catch (error) {
      console.error("Failed to fetch favorites:", error);
  }
};

export const createFavorite = (favoriteData) => async dispatch => {
  try {
      const response = await jwtFetch('/api/favorites/new', {
          method: 'POST',
          body: JSON.stringify(favoriteData)
      });

      const data = await response.json();
      dispatch(addFavorite(data));
  } catch (error) {
      console.error("Failed to create favorite:", error);
  }
};

export const removeFavorite = (id) => async dispatch => {
  try {
      const res = await jwtFetch(`/api/favorites/${id}`, { method: 'DELETE' });
      const test = await res.json();
      
      dispatch(deleteFavorite(id));
  } catch (error) {
      console.error("Failed to delete favorite:", error);
  }
};


//////
export const favoritesReducer = (state = {}, action) => {
    const newState = { ...state };
    switch(action.type) {
      case GET_FAVORITES:
        return {...state, ...action.favorites};
      case CREATE_FAVORITE:
        return { ...state, [action.favorite._id]: action.favorite };
      case DELETE_FAVORITE:
        delete newState[action.favoriteId];
        return newState;
      default:
        return state;
    }
};


export default favoritesReducer;