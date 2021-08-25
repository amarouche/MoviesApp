const initialState = {favoritesFilm: []}
 function reducerFavorite(state = initialState, action){
let nextState
  switch (action.type) {
    case'TOGGLE_FAVORITE':
      const filmFavIndex = state.favoritesFilm.findIndex(item => item.id === action.value.id)
      if(filmFavIndex !== -1){
        nextState = {
          ...state,
          favoritesFilm: state.favoritesFilm.filter((item, index) => index !== filmFavIndex)
        }
      }
      else{
        nextState = {
          ...state,
          favoritesFilm: [...state.favoritesFilm, action.value] 
        }
      }
      return nextState || state
    default:
      return state
  }
}
export default reducerFavorite