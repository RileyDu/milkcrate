const recordReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_RECORDS":
      return action.payload;
    case "CLEAR_RECORDS":
      return [];
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default recordReducer;
