import { expect } from 'chai';
import RL from '../src';
import * as types from './fixtures/types';

const rl = new RL('post');

rl.addAction('title', { title: '' });
rl.addAction('body', { body: '' });
rl.addAction('submit');

const { types: rlTypes } = rl.flush();

describe('Testing types', () => {
  describe('Redux', () => {
    it('should test POST_TITLE', () => {
      expect(types.POST_TITLE).to.be.equal('@@post/TITLE');
    });

    it('should test POST_BODY', () => {
      expect(types.POST_BODY).to.be.equal('@@post/BODY');
    });

    it('should test POST_SUBMIT', () => {
      expect(types.POST_SUBMIT).to.be.equal('@@post/SUBMIT');
    });
  });

  describe('Redux Lazy', () => {
    it('should test POST_TITLE', () => {
      expect(rlTypes.POST_TITLE).to.be.equal('@@post/TITLE');
    });

    it('should test POST_BODY', () => {
      expect(rlTypes.POST_BODY).to.be.equal('@@post/BODY');
    });

    it('should test POST_SUBMIT', () => {
      expect(rlTypes.POST_SUBMIT).to.be.equal('@@post/SUBMIT');
    });

    it('should test type with camelCase to underscore', () => {
      const newRl = new RL('newPost');
      newRl.addAction('newTitle', { title: '' });
      const { types: newRlTypes } = newRl.flush();

      expect(newRlTypes.NEW_POST_NEW_TITLE).to.be.equal('@@newPost/NEW_TITLE');
    });
  });
});
