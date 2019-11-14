const initialState = {
  isAuthoring: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_AUTHORING':
      return {
        ...state,
        isAuthoring: payload
      };
    default:
      return state;
  }
}
