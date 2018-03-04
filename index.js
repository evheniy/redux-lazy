const { connect } = require('react-redux');

class RL {
    constructor(ns) {
        this.ns = this.trim(ns);
        this.actions = [];
    }

    trim(text) {
        return text.replace(/^\s+|\s+$/g, '');
    }

    toUnderscore(text) {
        return text.replace(/([A-Z])/g, $1 => '_' + $1.toLowerCase());
    }

    addAction(name, payload = {}) {
        this.actions.push({ name, payload });
    }

    getNSKey() {
        return `@@${this.ns}`;
    }

    toConst(text) {
        return this.toUnderscore(text).toUpperCase();
    }

    flush() {
        const nameSpace = `${this.getNSKey()}/${this.toConst(this.ns)}`;

        const types = {};
        const actions = {};
        let defaultState = {};

        this.actions.forEach((action) => {
            // types
            const typeKey = this.toConst(this.ns) + '_' + this.toConst(action.name);
            types[typeKey] = `${this.getNSKey()}/${this.toConst(action.name)}`;

            // actions
            const actionKey = action.name + 'Action';
            actions[actionKey] = (payload = action.payload) => ({
                type: `${this.getNSKey()}/${this.toConst(action.name)}`,
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