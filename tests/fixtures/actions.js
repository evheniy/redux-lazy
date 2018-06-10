import {
  POST_TITLE,
  POST_BODY,
  POST_SUBMIT,
} from './types';

export const titleAction = title => ({
  type: POST_TITLE,
  title,
});

export const bodyAction = body => ({
  type: POST_BODY,
  body,
});

export const submitAction = () => ({
  type: POST_SUBMIT,
});
