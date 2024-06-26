const blindbagReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_BLINDBAG":
      return action.payload;
    case "CLEAR_BLINDBAG":
      return {};
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default blindbagReducer;
