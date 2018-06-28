# Actions

**[Action creators](https://redux.js.org/basics/actions#action-creators)** are exactly that—functions that create actions. 
It's easy to conflate the terms “action” and “action creator”, so do your best to use the proper term.

## Redux

To update redux state you need to create action creator for each action type.


```javascript
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

const { actions } = rl;
```

## Default parameters

When you create action you can set payload.
It will be a part of default state:


```javascript
rl.addAction('title', { title: 'title' });
```

Or

```javascript
const title = 'title';

rl.addAction('title', { title });
```

And to run:

```javascript
import rl from '../src/rl'

const { actions } = rl.flush();

const action = actions.titleAction();
```

It will return:


```javascript
{
  type: types.POST_TITLE,
  payload: {
    title: 'title',
  },
}
```

How to set default state see [docs](https://github.com/evheniy/redux-lazy/blob/master/docs/reducer.md).

## Testing

```javascript
import { expect } from 'chai';
import rl from '../src/rl'

const { types, actions } = rl.flush();

describe('Testing actions', () => {
  it('should test titleAction', () => {
    const title = 'title';

    const action = actions.titleAction({ title });

    expect(action).to.be.a('object');

    expect(action.type).to.be.equal(types.POST_TITLE);
    expect(action.payload.title).to.be.equal(title);
  });

  it('should test bodyAction', () => {
    const body = 'body';

    const action = actions.bodyAction({ body });

    expect(action).to.be.a('object');

    expect(action.type).to.be.equal(types.POST_BODY);
    expect(action.payload.body).to.be.equal(body);
  });

  it('should test submitAction', () => {
    const action = actions.submitAction();

    expect(action).to.be.a('object');

    expect(action.type).to.be.equal(types.POST_SUBMIT);
  });
});

```

## Documentation

 * [Install](https://github.com/evheniy/redux-lazy/blob/master/docs/install.md)
 * [How to use](https://github.com/evheniy/redux-lazy/blob/master/docs/use.md)
 * [Types](https://github.com/evheniy/redux-lazy/blob/master/docs/types.md)
 * [Reducer](https://github.com/evheniy/redux-lazy/blob/master/docs/reducer.md)
 * [Container](https://github.com/evheniy/redux-lazy/blob/master/docs/container.md)
 * [Options](https://github.com/evheniy/redux-lazy/blob/master/docs/options.md)

[More examples](https://github.com/evheniy/redux-lazy/blob/master/tests/actions.js)
