# Reducer

**[Reducers](https://redux.js.org/basics/reducers)** specify how the application's state changes in response to [actions](https://redux.js.org/basics/actions) sent to the store. 
Remember that actions only describe *what happened*, but don't describe how the application's state changes.

## Redux

To change redux state you need to create reducer:

```javascript
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
```

## Redux Lazy

With Redux Lazy you don't need to make it manually.
Create **rl.js** file inside of your module and put code like this:

```javascript
import RL from 'redux-lazy';

const rl = new RL('post');

rl.addAction('title', { title: '' });
rl.addAction('body', { body: '' });
rl.addAction('submit');

export default rl;
```

Then import **rl** where you need it:

```javascript
import rl from './rl';

const { reducer } = rl;
```

## Default state

When you create Redux Lazy instance you can set default state as the second parameter

```javascript
const defaultState = { title: 'title', body: 'body' };
const rl = new RL('post', defaultState);
const { defaultState: newRlDefaultState } = rl.flush();
```

## Testing

```javascript
import { expect } from 'chai';
import RL from '../src';
import * as types from './fixtures/types';
import reducer from './fixtures/reducer';

const rl = new RL('post');

rl.addAction('title', { title: '' });
rl.addAction('body', { body: '' });
rl.addAction('submit');

const {
  types,
  reducer,
  defaultState: rlDefaultState,
} = rl.flush();

describe('Testing reducer', () => {
  const defaultState = {
    title: '',
    body: '',
  };

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
    const state = reducer(undefined, { type: 'test' });

    expect(state).to.be.eql(defaultState);
  });

  it('should test POST_TITLE action', () => {
    const title = 'title';

    const state = reducer(undefined, { type: types.POST_TITLE, payload: { title } });

    expect(state.title).to.be.equal(title);
  });

  it('should test POST_BODY action', () => {
    const body = 'body';

    const state = reducer(undefined, { type: types.POST_BODY, payload: { body } });

    expect(state.body).to.be.equal(body);
  });

  it('should test default state with value', () => {
    const state = reducer({ test: true }, { type: 'test' });

    expect(state.test).to.be.equal(true);
  });
});
```

## Documentation

 * [Install](https://github.com/evheniy/redux-lazy/blob/master/docs/install.md)
 * [Types](https://github.com/evheniy/redux-lazy/blob/master/docs/types.md)
 * [Actions](https://github.com/evheniy/redux-lazy/blob/master/docs/actions.md)
 * [Container](https://github.com/evheniy/redux-lazy/blob/master/docs/container.md)

[More examples](https://github.com/evheniy/redux-lazy/blob/master/tests/reducer.js)

