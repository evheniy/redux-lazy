import { expect } from 'chai';
import RL from '../src';
import * as types from './fixtures/types';
import reducer from './fixtures/reducer';

const rl = new RL('post');

rl.addAction('title', { title: '' });
rl.addAction('body', { body: '' });
rl.addAction('submit');

const {
  types: rlTypes,
  reducer: rlReducer,
  defaultState: rlDefaultState,
} = rl.flush();

describe('Testing reducer', () => {
  const defaultState = {
    title: '',
    body: '',
  };

  describe('Redux', () => {
    it('should test default state', () => {
      const state = reducer(undefined, { type: 'test' });

      expect(state).to.be.eql(defaultState);
    });

    it('should test POST_TITLE action', () => {
      const title = 'title';

      const state = reducer(undefined, { type: types.POST_TITLE, title });

      expect(state.title).to.be.equal(title);
    });

    it('should test POST_BODY action', () => {
      const body = 'body';

      const state = reducer(undefined, { type: types.POST_BODY, body });

      expect(state.body).to.be.equal(body);
    });

    it('should test default state with value', () => {
      const state = reducer({ test: true }, { type: 'test' });

      expect(state.test).to.be.equal(true);
    });
  });

  describe('Redux Lazy', () => {
    it('should test RL default state', () => {
      expect(rlDefaultState).to.be.eql(defaultState);
    });

    it('should test RL new default state', () => {
      const newDefaultState = { title: 'title', body: 'body' };
      const newRl = new RL('post', newDefaultState);
      const { defaultState: newRlDefaultState } = newRl.flush();

      expect(newRlDefaultState).to.be.not.eql(defaultState);
      expect(newRlDefaultState).to.be.eql(newDefaultState);
    });

    it('should test default state', () => {
      const state = rlReducer(undefined, { type: 'test' });

      expect(state).to.be.eql(defaultState);
    });

    it('should test POST_TITLE action', () => {
      const title = 'title';

      const state = rlReducer(undefined, { type: rlTypes.POST_TITLE, payload: { title } });

      expect(state.title).to.be.equal(title);
    });

    it('should test POST_BODY action', () => {
      const body = 'body';

      const state = rlReducer(undefined, { type: rlTypes.POST_BODY, payload: { body } });

      expect(state.body).to.be.equal(body);
    });

    it('should test default state with value', () => {
      const state = rlReducer({ test: true }, { type: 'test' });

      expect(state.test).to.be.equal(true);
    });
  });
});
