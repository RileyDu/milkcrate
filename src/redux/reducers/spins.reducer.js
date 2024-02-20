const spinsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_SPINS':
          return action.payload;
        default:
          return state;
      }
    }
  
  // user will be on the redux state at:
  // state.user
  export default spinsReducer;
  