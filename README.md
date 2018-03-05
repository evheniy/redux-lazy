# redux-lazy

Generating constants, action types, action creators, reducers and containers.

## How to install

    npm i -D redux-lazy
    
## How to use

### Before

#### Constants

```javascript
export const ACTIONS = '@@actions/ACTIONS';
```

#### Types

```javascript
export const ACTIONS_INIT = '@@actions/INIT';
export const ACTIONS_IDLE = '@@actions/IDLE';
export const ACTIONS_CLEAR = '@@actions/CLEAR';
```

#### Actions

```javascript
import * as constants from '../constants';

export const initActions = () => ({
  type: constants.ACTIONS_INIT,
});

export const idleActions = () => ({
  type: constants.ACTIONS_IDLE,
});

export const clearActions = () => ({
  type: constants.ACTIONS_CLEAR,
});
```

#### Reducers

```javascript
import * as constants from '../constants';

const status = 'null';

const defaultState = {
  status,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.ACTIONS_INIT:
      return { ...state, status: 'init' };
    case constants.ACTIONS_IDLE:
      return { ...state, status: 'idle' };
    case constants.ACTIONS_CLEAR:
      return { ...state, status };
    default:
      return state;
  }
};
```

#### Container

```javascript
import { connect } from 'react-redux';
import Component from '../components';
import { initActions, clearActions } from '../actions';
import { ACTIONS } from '../constants';

const mapStateToProps = state => state[ACTIONS];
const mapDispatchToProps = { initActions, clearActions };

export default connect(mapStateToProps, mapDispatchToProps)(Component);
```

### Redux Lazy

#### Using

```javascript
import RL from 'redux-lazy';

const rl = new RL('testAction');

rl.addAction('init', { status: 'init' });
rl.addAction('idle', { status: 'idle' });
rl.addAction('clear', { status: 'null' });
```

#### Flush

```javascript
const {
  nameSpace, // '@@testAction/TEST_ACTION'
  types,
  actions,
  defaultState,
  reducer,
  Container,
} = rl.flush();
```

#### Types

```javascript
const { 
  TEST_ACTION_INIT, // '@@testAction/INIT'
  TEST_ACTION_IDLE, // '@@testAction/IDLE',
  TEST_ACTION_CLEAR, // '@@testAction/CLEAR'
} = types;
```

#### Actions

```javascript
const {
  initAction,
  idleAction,
  clearAction,
} = actions;
```

#### All together

```javascript
const action = rl.flush();

console.log(action);
```

#### Result

    { nameSpace: '@@testAction/TEST_ACTION',
      types: 
       { TEST_ACTION_INIT: '@@testAction/INIT',
         TEST_ACTION_IDLE: '@@testAction/IDLE',
         TEST_ACTION_CLEAR: '@@testAction/CLEAR' },
      actions: 
       { initAction: [Function],
         idleAction: [Function],
         clearAction: [Function] },
      defaultState: { status: 'null' },
      reducer: [Function: reducer],
      mapStateToProps: [Function: mapStateToProps],
      mapDispatchToProps: 
       { initAction: [Function],
         idleAction: [Function],
         clearAction: [Function] },
      Container: [Function: Container] }

