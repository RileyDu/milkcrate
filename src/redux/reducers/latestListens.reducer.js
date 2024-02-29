const latestListensReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_LATEST_LISTENS':
          return action.payload;
        default:
          return state;
      }
    }

  export default latestListensReducer;