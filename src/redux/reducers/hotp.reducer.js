const hotpReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_HOTP':
          return action.payload;
        default:
          return state;
      }
    }

  export default hotpReducer;