
const initialState = {
  total: 0,
  limit: 4,
  offset: 0,
  items: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'PRODUCTS_FETCH_COMPLETE':
      return {
        ...state,
        total: action.payload.products.total,
        items: action.payload.products.items
      };
    default:
      return state
  }
}
