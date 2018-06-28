const { connect } = require('react-redux');

const toUnderscore = text => text.replace(/([A-Z])/g, $1 => `_${$1.toLowerCase()}`);

const toConst = text => toUnderscore(text).toUpperCase();

class RL {
  constructor(ns, defaultState = null) {
    this.ns = ns.trim();
    this.defaultState = defaultState;
    this.actions = [];
  }

  addAction(name, payload = {}, options = {}) {
    if (name === 'type') {
      throw new Error('Action name should not be "type"! This can create a conflict with redux action creators.');
    }

    if (payload.type !== undefined) {
      throw new Error('You should not make "type" fields! This can create a conflict with redux action creators.');
    }

    this.actions.push({ name, payload, options });
  }

  addFormAction(name) {
    this.addAction(name, {}, { isForm: true });
  }

  addFormElementAction(name, defaultValue = null) {
    this.addAction(
      name,
      { [name]: defaultValue },
      { isFormElement: true, asParams: name },
    );
  }

  addEventAction(name) {
    this.addAction(name, {}, { isEvent: true });
  }

  getNSKey() {
    return `@@${this.ns}`;
  }

  flush() {
    const nameSpace = `${this.getNSKey()}/${toConst(this.ns)}`;

    const types = {};
    const actions = {};
    const defaultState = {};

    this.actions.forEach((action) => {
      // types
      const typeKey = `${toConst(this.ns)}_${toConst(action.name)}`;
      types[typeKey] = `${this.getNSKey()}/${toConst(action.name)}`;

      // actions
      const actionKey = `${action.name}Action`;

      // event
      if (action.options.isEvent) {
        actions[actionKey] = () => ({ type: `${this.getNSKey()}/${toConst(action.name)}` });
      }

      // submit form
      if (action.options.isForm) {
        actions[actionKey] = (event) => {
          if (event && event.preventDefault) {
            event.preventDefault();
          }

          return {
            type: `${this.getNSKey()}/${toConst(action.name)}`,
          };
        };
      }

      // set data from input event (event.target.value)
      if (action.options.isFormElement) {
        actions[actionKey] = (event) => {
          const payload = { ...action.payload };
          if (event && event.target && event.target.value !== undefined) {
            const { target: { value } } = event;
            Object.keys(action.payload).forEach((key) => {
              payload[key] = value;
            });
          }

          return {
            type: `${this.getNSKey()}/${toConst(action.name)}`,
            payload,
          };
        };
      }

      // map action({ data }) to action(data)
      if (action.options.asParams) {
        let params = action.options.asParams;
        if (!Array.isArray(params)) {
          params = [params];
        }

        const type = `${this.getNSKey()}/${toConst(action.name)}`;

        actions[actionKey] = (...args) => {
          const payload = {};
          params.forEach((param, number) => {
            const data = (
              action.options.isFormElement
              && args[number]
              && args[number].target
              && args[number].target.value !== undefined
            )
              ? args[number].target.value
              : args[number];
            payload[param] = data || action.payload[param];
          });

          return { ...payload, type };
        };
      }

      if (!Object.keys(action.options).length) {
        actions[actionKey] = (payload = action.payload) => {
          const response = {
            type: `${this.getNSKey()}/${toConst(action.name)}`,
            payload,
          };

          if (!Object.keys(payload).length) {
            delete response.payload;
          }

          return response;
        };
      }

      // default state
      Object.assign(defaultState, action.payload);
    });

    // full default state
    Object.assign(defaultState, this.defaultState);

    const reducer = (state = defaultState, action) => {
      if (Object.values(types).includes(action.type)) {
        return { ...state, ...action, ...action.payload };
      }

      return state;
    };

    const mapStateToProps = state => state[nameSpace];
    const mapDispatchToProps = Object.assign({}, actions);

    const Container = connect(mapStateToProps, mapDispatchToProps);

    return {
      nameSpace,
      types,
      actions,
      defaultState,
      reducer,
      mapStateToProps,
      mapDispatchToProps,
      Container,
    };
  }
}

module.exports = RL;
