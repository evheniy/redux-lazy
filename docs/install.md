# Install

## How to install

     npm i -S redux-lazy
     
Or

    yarn add redux-lazy
    
## How to use

To work with Redux Lazy you need to make only 3 steps:

### 1. Import redux-lazy

```javascript
import RL from 'redux-lazy';
```

### 2. Create a instance

```javascript
const rl = new RL('post');
```

### 3. Add actions

```javascript
rl.addAction('title', { title: '' });
rl.addAction('body', { body: '' });
```
After that you can flush all code for working with redux:

```javascript
const {
  nameSpace,
  types,
  actions,
  defaultState,
  reducer,
  mapStateToProps,
  mapDispatchToProps,
  Container,
} = rl.flush();
```

## Default state

When you add action to Redux Lazy you can set payload.
Payload from all actions creates default state.

If you need to customize it you can set default state:

```javascript
  const defaultState = { title: 'title', body: 'body' };
  const rl = new RL('post', defaultState);
```

## Documentation

 * [Types](https://github.com/evheniy/redux-lazy/blob/master/docs/types.md)
 * [Actions](https://github.com/evheniy/redux-lazy/blob/master/docs/actions.md)
 * [Reducer](https://github.com/evheniy/redux-lazy/blob/master/docs/reducer.md)
 * [Container](https://github.com/evheniy/redux-lazy/blob/master/docs/container.md)
 * [Options](https://github.com/evheniy/redux-lazy/blob/master/docs/options.md)
   
[More examples](https://github.com/evheniy/redux-lazy/blob/master/tests/)
