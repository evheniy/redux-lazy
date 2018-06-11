import { expect } from 'chai';
import RL from '../src';
import * as types from './fixtures/types';
import * as actions from './fixtures/actions';

const rl = new RL('post');

rl.addAction('title', { title: '' });
rl.addAction('body', { body: '' });
rl.addAction('submit');

const { types: rlTypes, actions: rlActions } = rl.flush();

describe('Testing actions', () => {
  describe('Redux', () => {
    it('should test titleAction', () => {
      const title = 'title';

      const action = actions.titleAction(title);

      expect(action).to.be.a('object');

      expect(action.type).to.be.equal(types.POST_TITLE);
      expect(action.title).to.be.equal(title);
    });

    it('should test bodyAction', () => {
      const body = 'body';

      const action = actions.bodyAction(body);

      expect(action).to.be.a('object');

      expect(action.type).to.be.equal(types.POST_BODY);
      expect(action.body).to.be.equal(body);
    });

    it('should test submitAction', () => {
      const action = actions.submitAction();

      expect(action).to.be.a('object');

      expect(action.type).to.be.equal(types.POST_SUBMIT);
    });
  });

  describe('Redux Lazy', () => {
    it('should test titleAction', () => {
      const title = 'title';

      const action = rlActions.titleAction({ title });

      expect(action).to.be.a('object');

      expect(action.type).to.be.equal(rlTypes.POST_TITLE);
      expect(action.payload.title).to.be.equal(title);
    });

    it('should test titleAction with default params', () => {
      const action = rlActions.titleAction();

      expect(action).to.be.a('object');

      expect(action.type).to.be.equal(rlTypes.POST_TITLE);
      expect(action.payload.title).to.be.equal('');
    });

    it('should test bodyAction', () => {
      const body = 'body';

      const action = rlActions.bodyAction({ body });

      expect(action).to.be.a('object');

      expect(action.type).to.be.equal(rlTypes.POST_BODY);
      expect(action.payload.body).to.be.equal(body);
    });

    it('should test bodyAction with default params', () => {
      const action = rlActions.bodyAction();

      expect(action).to.be.a('object');

      expect(action.type).to.be.equal(rlTypes.POST_BODY);
      expect(action.payload.body).to.be.equal('');
    });

    it('should test submitAction', () => {
      const action = rlActions.submitAction();

      expect(action).to.be.a('object');

      expect(action.type).to.be.equal(rlTypes.POST_SUBMIT);
    });

    it('should test action with camelCase to underscore', () => {
      const newRl = new RL('newPost');

      newRl.addAction('newTitle', { title: '' });

      const { types: newRlTypes, actions: newRlActions } = newRl.flush();

      const title = 'title';

      const action = newRlActions.newTitleAction({ title });

      expect(action).to.be.a('object');

      expect(action.type).to.be.equal(newRlTypes.NEW_POST_NEW_TITLE);
      expect(action.payload.title).to.be.equal(title);
    });

    it('should test action with camelCase to underscore and default params', () => {
      const title = 'title';

      const newRl = new RL('newPost');

      newRl.addAction('newTitle', { title });

      const { types: newRlTypes, actions: newRlActions } = newRl.flush();

      const action = newRlActions.newTitleAction();

      expect(action).to.be.a('object');

      expect(action.type).to.be.equal(newRlTypes.NEW_POST_NEW_TITLE);
      expect(action.payload.title).to.be.equal(title);
    });
  });
});
