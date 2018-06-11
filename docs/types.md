# Types

## If you use redux you need to create [types](https://redux.js.org/basics/actions):

```javascript
export const POST_TITLE = '@@post/TITLE';
export const POST_BODY = '@@post/BODY';
export const POST_SUBMIT = '@@post/SUBMIT';
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
How to add actions see [docs](https://github.com/evheniy/redux-lazy/blob/master/docs/actions.md).

Then import **rl** where you need it:

```javascript
import rl from './rl';

const { types } = rl;
```

## Testing

```javascript
import { expect } from 'chai';
import rl from '../src/rl';

const { types } = rl.flush();

describe('Testing types', () => {
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

```

## Documentation

 * [Install](https://github.com/evheniy/redux-lazy/blob/master/docs/install.md)
 * [Actions](https://github.com/evheniy/redux-lazy/blob/master/docs/actions.md)
 * [Reducer](https://github.com/evheniy/redux-lazy/blob/master/docs/reducer.md)
 * [Container](https://github.com/evheniy/redux-lazy/blob/master/docs/container.md)
 * [Options](https://github.com/evheniy/redux-lazy/blob/master/docs/options.md)


[More examples](https://github.com/evheniy/redux-lazy/blob/master/tests/types.js)
