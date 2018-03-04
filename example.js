const RL = require('.');

const rl = new RL('testAction');
rl.addAction('init', { status: 'init' });
rl.addAction('idle', { status: 'idle' });
rl.addAction('clear', { status: 'null' });

console.log(rl);


const action = rl.flush();

console.log(action);

console.log('initAction:', action.actions.initAction());
console.log('initAction:', action.actions.initAction({ states: 'test'}));

const { reducer, actions, types } = action;

console.log('Reduce initAction():', reducer(undefined, actions.initAction()));
console.log('Reduce idleAction():', reducer(undefined, actions.idleAction()));
console.log('Reduce clearAction():', reducer(undefined, actions.clearAction()));

console.log('Reduce initAction() with status:', reducer({ otherField: 'test' }, actions.initAction({ states: 'test'})));

const { TEST_ACTION_INIT } = types;
console.log('Constant for epic: TEST_ACTION_INIT =', TEST_ACTION_INIT);