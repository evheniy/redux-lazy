import { expect } from 'chai';
import { spy } from 'sinon';
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

    it('should test action isForm option', () => {
      const preventDefault = spy();

      const event = {
        preventDefault,
      };

      const newRl = new RL('post');

      newRl.addAction('submit', {}, { isForm: true });

      const { types: newRlTypes, actions: newRlActions } = newRl.flush();

      const action = newRlActions.submitAction(event);

      expect(action).to.be.a('object');

      expect(action.type).to.be.equal(newRlTypes.POST_SUBMIT);
      expect(preventDefault.calledOnce).to.be.equal(true);
    });

    it('should test action isForm option without event', () => {
      const newRl = new RL('post');

      newRl.addAction('submit', {}, { isForm: true });

      const { types: newRlTypes, actions: newRlActions } = newRl.flush();

      const action = newRlActions.submitAction();

      expect(action).to.be.a('object');

      expect(action.type).to.be.equal(newRlTypes.POST_SUBMIT);
    });

    it('should test action isFormElement option', () => {
      const value = 'value';
      const event = {
        target: {
          value,
        },
      };

      const newRl = new RL('post');

      newRl.addAction('title', { title: '' }, { isFormElement: true });

      const { types: newRlTypes, actions: newRlActions } = newRl.flush();

      const action = newRlActions.titleAction(event);

      expect(action).to.be.a('object');

      expect(action.type).to.be.equal(newRlTypes.POST_TITLE);
      expect(action.payload.title).to.be.equal(value);
    });

    it('should test action isFormElement option without event', () => {
      const title = 'title';

      const newRl = new RL('post');

      newRl.addAction('title', { title }, { isFormElement: true });

      const { types: newRlTypes, actions: newRlActions } = newRl.flush();

      const action = newRlActions.titleAction();

      expect(action).to.be.a('object');

      expect(action.type).to.be.equal(newRlTypes.POST_TITLE);
      expect(action.payload.title).to.be.equal(title);
    });

    it('should test action asParams option', () => {
      const title = 'title';

      const newRl = new RL('post');

      newRl.addAction('title', { title }, { asParams: 'title' });

      const { types: newRlTypes, actions: newRlActions } = newRl.flush();

      const action = newRlActions.titleAction(title);

      expect(action).to.be.a('object');

      expect(action.type).to.be.equal(newRlTypes.POST_TITLE);
      expect(action.title).to.be.equal(title);
    });

    it('should test action asParams option with array', () => {
      const title = 'title';
      const body = 'body';

      const newRl = new RL('post');

      newRl.addAction('clear', { title, body }, { asParams: ['title', 'body'] });

      const { types: newRlTypes, actions: newRlActions } = newRl.flush();

      const action = newRlActions.clearAction(title, body);

      expect(action).to.be.a('object');

      expect(action.type).to.be.equal(newRlTypes.POST_CLEAR);
      expect(action.title).to.be.equal(title);
      expect(action.body).to.be.equal(body);
    });

    it('should test action asParams option with default value', () => {
      const title = 'title';

      const newRl = new RL('post');

      newRl.addAction('title', { title }, { asParams: 'title' });

      const { types: newRlTypes, actions: newRlActions } = newRl.flush();

      const action = newRlActions.titleAction();

      expect(action).to.be.a('object');

      expect(action.type).to.be.equal(newRlTypes.POST_TITLE);
      expect(action.title).to.be.equal(title);
    });

    it('should test action asParams option with default value and array', () => {
      const title = 'title';
      const body = 'body';

      const newRl = new RL('post');

      newRl.addAction('clear', { title, body }, { asParams: ['title', 'body'] });

      const { types: newRlTypes, actions: newRlActions } = newRl.flush();

      const action = newRlActions.clearAction();

      expect(action).to.be.a('object');

      expect(action.type).to.be.equal(newRlTypes.POST_CLEAR);
      expect(action.title).to.be.equal(title);
      expect(action.body).to.be.equal(body);
    });

    it('should test action isFormElement option with asParams option', () => {
      const value = 'value';

      const event = {
        target: {
          value,
        },
      };

      const newRl = new RL('post');

      newRl.addAction('title', { title: '' }, { isFormElement: true, asParams: 'title' });

      const { types: newRlTypes, actions: newRlActions } = newRl.flush();

      const action = newRlActions.titleAction(event);

      expect(action).to.be.a('object');

      expect(action.type).to.be.equal(newRlTypes.POST_TITLE);
      expect(action.title).to.be.equal(value);
    });

    it('should test action isFormElement option with asParams option and array', () => {
      const value = 'value';

      const event = {
        target: {
          value,
        },
      };

      const newRl = new RL('post');

      newRl.addAction('clear', { title: '', body: '' }, { isFormElement: true, asParams: ['title', 'body'] });

      const { types: newRlTypes, actions: newRlActions } = newRl.flush();

      const action = newRlActions.clearAction(event);

      expect(action).to.be.a('object');

      expect(action.type).to.be.equal(newRlTypes.POST_CLEAR);
      expect(action.title).to.be.equal(value);
      expect(action.body).to.be.equal('');
    });

    it('should test action isFormElement option with asParams option and array', () => {
      const value = 'value';

      const event = {
        target: {
          value,
        },
      };

      const event2 = {
        target: {
          value: 'body',
        },
      };

      const newRl = new RL('post');

      newRl.addAction('clear', { title: '', body: '' }, { isFormElement: true, asParams: ['title', 'body'] });

      const { types: newRlTypes, actions: newRlActions } = newRl.flush();

      const action = newRlActions.clearAction(event, event2);

      expect(action).to.be.a('object');

      expect(action.type).to.be.equal(newRlTypes.POST_CLEAR);
      expect(action.title).to.be.equal(value);
      expect(action.body).to.be.equal('body');
    });

    it('should test action isFormElement option with asParams option and default value', () => {
      const title = 'title';

      const newRl = new RL('post');

      newRl.addAction('title', { title }, { isFormElement: true, asParams: 'title' });

      const { types: newRlTypes, actions: newRlActions } = newRl.flush();

      const action = newRlActions.titleAction();

      expect(action).to.be.a('object');

      expect(action.type).to.be.equal(newRlTypes.POST_TITLE);
      expect(action.title).to.be.equal(title);
    });

    it('should test action isFormElement option with asParams option and default value and array', () => {
      const title = 'title';
      const body = 'body';

      const newRl = new RL('post');

      newRl.addAction('clear', { title, body }, { isFormElement: true, asParams: ['title', 'body'] });

      const { types: newRlTypes, actions: newRlActions } = newRl.flush();

      const action = newRlActions.clearAction();

      expect(action).to.be.a('object');

      expect(action.type).to.be.equal(newRlTypes.POST_CLEAR);
      expect(action.title).to.be.equal(title);
      expect(action.body).to.be.equal(body);
    });
  });
});
