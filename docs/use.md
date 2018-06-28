# How to use

## Form

If you need to submit form:

### Redux

Action:
```javascript
export const MODULE_SUBMIT = '@@module/SUBMIT';

export const submitAction = () => ({
  type: MODULE_SUBMIT,
});
```
React:
```html
<form onSubmit={(event) => {
    event.preventDefault();
    props.submitAction();
}}>
```

### Redux Lazy

Action:
```javascript
rl.addFormAction('submit');
```
React:
```html
<form onSubmit={props.submitAction}>
```

## Form Element

If you need to get value from form input (textarea or < input type="text" />):

### Redux

Action:
```javascript
export const MODULE_TITLE = '@@module/TITLE';

export const titleAction = (title) => ({
  type: MODULE_SUBMIT,
  title,
});
```
React:
```html
<input
  type="text"
  onChange={event => props.titleAction(event.target.value)}
  value={props.title}
/>
```

### Redux Lazy

Action:
```javascript
rl.addFormElementAction('title', 'defaultValue');
```
React:
```html
<input
  type="text"
  onChange={props.titleAction}
  value={props.title}
/>
```

## Event

If you need to get event, for example button click:

```javascript
rl.addEventAction('event');
```
React:
```html
<button onClick={props.eventAction} />
```


## Action with parameter

You can emulate redux action:

```javascript
rl.addParamAction('title', 'defaultValue');

const { actions } = rl.flush();
```
And you will have action:

```javascript
actions.titleActions('text');
```
Result:

```javascript
{
  type: types.POST_TITLE,
  title: 'text',
}
```

Or with default value:

```javascript
actions.titleActions();
```
Result:

```javascript
{
  type: types.POST_TITLE,
  title: 'defaultValue',
}
```

## Action with parameters

If you need to update more than one parameter:


```javascript
rl.addParamsAction('clear', { title: 'defaultTitleValue', body: 'defaultBodyValue' });

const { actions } = rl.flush();
```

And you will have action:

```javascript
actions.clearActions('title', 'body');
```
Result:

```javascript
{
  type: types.POST_TITLE,
  title: 'title',
  body: 'body',
}
```

Or with default value:

```javascript
actions.clearActions();
```
Result:

```javascript
{
  type: types.POST_TITLE,
  title: 'defaultTitleValue',
  body: 'defaultBodyValue',
}
```

## Documentation

 * [Install](https://github.com/evheniy/redux-lazy/blob/master/docs/install.md)
 * [Types](https://github.com/evheniy/redux-lazy/blob/master/docs/types.md)
 * [Actions](https://github.com/evheniy/redux-lazy/blob/master/docs/actions.md)
 * [Reducer](https://github.com/evheniy/redux-lazy/blob/master/docs/reducer.md)
 * [Container](https://github.com/evheniy/redux-lazy/blob/master/docs/container.md)
 * [Options](https://github.com/evheniy/redux-lazy/blob/master/docs/options.md)
