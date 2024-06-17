import jwtFetch from './jwt';
import { receiveDecks } from './decks';
import { clearDecks } from './decks';

import {getFavorites, clearFavorites } from './favorites'


const RECEIVE_CURRENT_USER = "session/RECEIVE_CURRENT_USER";
const RECEIVE_SESSION_ERRORS = "session/RECEIVE_SESSION_ERRORS";
const CLEAR_SESSION_ERRORS = "session/CLEAR_SESSION_ERRORS"
export const RECEIVE_USER_LOGOUT = "session/RECEIVE_USER_LOGOUT";

// Dispatch receiveCurrentUser when a user logs in.
const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});
  
// Dispatch receiveErrors to show authentication errors on the frontend.
const receiveErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

// Dispatch logoutUser to clear the session user when a user logs out.
const logoutUser = () => ({
  type: RECEIVE_USER_LOGOUT
});

// Dispatch clearSessionErrors to clear any session errors.
export const clearSessionErrors = () => ({
  type: CLEAR_SESSION_ERRORS
});

export const signup = user => startSession(user, 'api/users/register');
export const login = user => startSession(user, 'api/users/login');
export const logout = () => dispatch => {
    localStorage.removeItem('jwtToken');
    dispatch(clearDecks());
    dispatch(clearFavorites());
    dispatch(logoutUser());
  };

const startSession = (userInfo, route) => async dispatch => {
  try {  
    const res = await jwtFetch(route, {
      method: "POST",
      body: JSON.stringify(userInfo)
    });

    const { currentUser, userDecks, favorites } = await res.json();
    localStorage.setItem('jwtToken', currentUser.token);
 
    const correctDecksId = {}
    const correctFavoritesId = {}

    userDecks.forEach(deck => {
      correctDecksId[deck._id] = deck
    });
    favorites.forEach(favorite=>{
      correctFavoritesId[favorite._id] = favorite
    })
    

    dispatch(receiveDecks(correctDecksId))
    dispatch(getFavorites(correctFavoritesId))

    return dispatch(receiveCurrentUser(currentUser.user));
  } catch(err) {
    const res = await err.json();
    if (res.statusCode === 400) {
      return dispatch(receiveErrors(res.errors));
    }
  }
};


const initialState = {
    user: undefined
  };

  export const getCurrentUser = () => async dispatch => {

    const res = await jwtFetch('/api/users/current');
    const results = await res.json();
    const correctDecksId = {}
    const correctFavoritesId={}

    if (results){
      results.userDecks.forEach(deck => {
        correctDecksId[deck._id] = deck
      });

      results.favorites.forEach(favorite=>{
        correctFavoritesId[favorite._id] = favorite
      })

      dispatch(receiveDecks(correctDecksId))
      dispatch(getFavorites(correctFavoritesId))
    
      return dispatch(receiveCurrentUser(results.user));

    }
    

   

  
  };
  


  
  const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
      case RECEIVE_CURRENT_USER:
        return { user: action.currentUser };
      case RECEIVE_USER_LOGOUT:
        return initialState;
      default:
        return state;
    }
  };


  const nullErrors = null;

export const sessionErrorsReducer = (state = nullErrors, action) => {
  switch(action.type) {
    case RECEIVE_SESSION_ERRORS:
      return action.errors;
    case RECEIVE_CURRENT_USER:
    case CLEAR_SESSION_ERRORS:
      return nullErrors;
    default:
      return state;
  }
};

  
  export default sessionReducer;