import { HYDRATE } from 'next-redux-wrapper';

import initialState from './initialState';

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (action.type) {
    case HYDRATE:
      console.log('hydrate');
      console.log(state);
      console.log(action);
      return {
        ...state,
        breeds: state.breeds || action.payload.breeds,
      };
    case 'CACHE':
      const { id, images } = payload;
      return {
        ...state,
        breeds: {
          ...state.breeds,
          [id]: {
            images,
          }
        }
      }
    default:
      return state;
  }
};


export default reducer;
