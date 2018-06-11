# Container

To get state from store and put it to React components you should use **[react-redux](https://github.com/reduxjs/react-redux)** library.
It has **[connect](https://github.com/reduxjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options)** - high order component (HOC) to get part of store and put it to component.

## Redux

```javascript
import { connect } from 'react-redux';
import * as actions from './actions';

export const POST = '@@post/POST';

const mapStateToProps = state => state[POST];
const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps);
```

Here we have 3 main points:

 * We need to create constant (POST) - it's useful for working with **[combineReducers](https://redux.js.org/basics/reducers#splitting-reducers)** and making selectors for **[mapStateToProps](https://github.com/reduxjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options)**.
 * We need to create selector and put it to **[mapStateToProps](https://github.com/reduxjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options)**.
 * We need to create **[mapDispatchToProps](https://github.com/reduxjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options)**.

After that we can use **connect** to wrap React component and put part of state using **selectors**.

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

const {
  nameSpace,
  Container,
  mapStateToProps,
  mapDispatchToProps,
} = rl;
```

We can use **nameSpace** for selectors.


## Documentation

 * [Install](https://github.com/evheniy/redux-lazy/blob/master/docs/install.md)
 * [Types](https://github.com/evheniy/redux-lazy/blob/master/docs/types.md)
 * [Actions](https://github.com/evheniy/redux-lazy/blob/master/docs/actions.md)
 * [Reducer](https://github.com/evheniy/redux-lazy/blob/master/docs/reducer.md)

[More examples](https://github.com/evheniy/redux-lazy/blob/master/tests/container.jsx)
