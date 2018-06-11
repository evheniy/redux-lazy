# Options

When you add action you can set the 3rd parameter - options

```javascript
rl.addAction('title', payload, options);
```
## isForm

When you need action to submit form you need to run event.preventDefault.
To make this you can wrap function:

```javascript
rl.addAction('submit');
```

And put as props:

```html
<form onSubmit={(event) => {
    event.preventDefault();
    props.submitAction();
}}>
```

Or you can use **isForm** option:

```javascript
rl.addAction('submit', {}, { isForm: true });
```

And put as props:

```html
<form onSubmit={props.submitAction}>
```

## isFormElement

When you need action to get value from form input event (event.target.value):

```javascript
rl.addAction('title', { title: '' });
```

And put as props:

```html
<input
  type="text"
  onChange={event => props.titleAction(event.target.value)}
  value={props.title}
/>
```
Or you can use **isFormElement** option:

```javascript
rl.addAction('title', { title: '' }, { isFormElement: true });
```
And put as props:

```html
<input
  type="text"
  onChange={props.titleAction}
  value={props.title}
/>
```

## asParams

Each time to run action you need to put payload as object:

```javascript
rl.addAction('title', { title: '' });
const { actions } = rl.flush();
```
And you will have action:

```javascript
const action = actions.titleActions({ title: 'text' });
```
With payload:

```javascript
{
  type: types.POST_TITLE,
  payload: {
    title: 'text',
  },
}
```

With **asParams** option you can get the same output like with native redux action creator:

```javascript
rl.addAction('title', { title: '' }, { asParams: 'title' });
const { actions } = rl.flush();
```
And you will have action:

```javascript
const action = actions.titleActions('text');
```
With payload:

```javascript
{
  type: types.POST_TITLE,
  title: 'text',
}
```
You can put many parameters:

```javascript
rl.addAction('clear', { title: '', body: '' }, { asParams: ['title', 'body'] });
const { actions } = rl.flush();
```
And you will have action:

```javascript
const action = actions.clearActions('title', 'body');
```
With payload:

```javascript
{
  type: types.POST_TITLE,
  title: 'title',
  body: 'body',
}
```
Or with default data:

```javascript
const action = actions.clearActions();
```
With payload:

```javascript
{
  type: types.POST_TITLE,
  title: '',
  body: '',
}
```

## asParams with isFormElement

You can use **asParams** option with **isFormElement**:

```javascript
rl.addAction('title', { title: '' }, { isFormElement: true, asParams: true });
```
And put as props:

```html
<input
  type="text"
  onChange={props.titleAction}
  value={props.title}
/>
```
It returns:

```javascript
{
  type: types.POST_TITLE,
  title: 'Text input data',
}
```


## Documentation

 * [Install](https://github.com/evheniy/redux-lazy/blob/master/docs/install.md)
 * [Types](https://github.com/evheniy/redux-lazy/blob/master/docs/types.md)
 * [Actions](https://github.com/evheniy/redux-lazy/blob/master/docs/actions.md)
 * [Reducer](https://github.com/evheniy/redux-lazy/blob/master/docs/reducer.md)
 * [Container](https://github.com/evheniy/redux-lazy/blob/master/docs/container.md)

[More examples](https://github.com/evheniy/redux-lazy/blob/master/tests/actions.js)
