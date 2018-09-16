import { expect } from 'chai';

import RL from '../src';

describe('Testing reset actions', () => {
  it('should test without default state', () => {
    const rl = new RL('post');

    rl.addParamAction('test', 'test');
    rl.addResetAction();

    const { types, actions } = rl.flush();

    expect(!!actions.resetAction).to.be.equal(true);

    const action = actions.resetAction();

    expect(action).to.be.a('object');

    expect(action.type).to.be.equal(types.POST_RESET);
    expect(action.test).to.be.equal('test');

    expect(action).to.be.eql({
      test: 'test',
      type: types.POST_RESET,
    });
  });

  it('should test with default state', () => {
    const defaultState = { value: 1 };

    const rl = new RL('post', defaultState);

    rl.addParamAction('test', 'test');
    rl.addResetAction();

    const { types, actions } = rl.flush();

    expect(!!actions.resetAction).to.be.equal(true);

    const action = actions.resetAction();

    expect(action).to.be.a('object');

    expect(action.type).to.be.equal(types.POST_RESET);
    expect(action.value).to.be.equal(1);
    expect(action.test).to.be.equal('test');

    expect(action).to.be.eql({
      test: 'test',
      value: 1,
      type: types.POST_RESET,
    });
  });

  it('should test custom name', () => {
    const rl = new RL('post');

    rl.addParamAction('test', 'test');
    rl.addResetAction('clear');

    const { types, actions } = rl.flush();

    expect(!!actions.resetAction).to.be.equal(false);
    expect(!!actions.clearAction).to.be.equal(true);

    const action = actions.clearAction();

    expect(action).to.be.a('object');

    expect(action.type).to.be.equal(types.POST_CLEAR);
    expect(action.test).to.be.equal('test');

    expect(action).to.be.eql({
      test: 'test',
      type: types.POST_CLEAR,
    });
  });

  it('should test exactly option', () => {
    const rl = new RL('post');

    rl.addParamAction('test', 'test');
    rl.addResetAction('clear', true);

    const { types, actions } = rl.flush();

    expect(!!actions.resetAction).to.be.equal(false);
    expect(!!actions.clearAction).to.be.equal(true);

    const action = actions.clearAction();

    expect(action).to.be.a('object');

    expect(action.type).to.be.equal(types.POST_CLEAR);

    expect(action).to.be.eql({
      type: types.POST_CLEAR,
    });
  });

  it('should test exactly option with default state', () => {
    const defaultState = { value: 1 };

    const rl = new RL('post', defaultState);

    rl.addParamAction('test', 'test');
    rl.addResetAction('clear', true);

    const { types, actions } = rl.flush();

    expect(!!actions.resetAction).to.be.equal(false);
    expect(!!actions.clearAction).to.be.equal(true);

    const action = actions.clearAction();

    expect(action).to.be.a('object');

    expect(action.type).to.be.equal(types.POST_CLEAR);
    expect(action.value).to.be.equal(1);

    expect(action).to.be.eql({
      value: 1,
      type: types.POST_CLEAR,
    });
  });
});
