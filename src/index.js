const { connect } = require('react-redux');

const toUnderscore = text => text.replace(/([A-Z])/g, $1 => `_${$1.toLowerCase()}`);

const toConst = text => toUnderscore(text).toUpperCase();

class RL {
  constructor(ns) {
    this.ns = ns.trim();
    this.actions = [];
  }

  addAction(name, payload = {}) {
    this.actions.push({ name, payload });
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
      actions[actionKey] = (payload = action.payload) => ({
        type: `${this.getNSKey()}/${toConst(action.name)}`,
        payload,
      });

      // default state
      Object.assign(defaultState, action.payload);
    });

    const reducer = (state = defaultState, action) => {
      if (Object.values(types).includes(action.type)) {
        return Object.assign({}, state, action.payload);
      }

      return state;
    };


    const mapStateToProps = state => state[nameSpace];
    const mapDispatchToProps = Object.assign({}, actions);

    const Container = Component => connect(mapStateToProps, mapDispatchToProps)(Component);


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
