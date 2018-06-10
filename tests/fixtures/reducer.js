import { POST_TITLE, POST_BODY } from './types';

export const defaultState = {
  title: '',
  body: '',
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case POST_TITLE:
    case POST_BODY:
      return { ...state, ...action };
    default:
      return state;
  }
};
