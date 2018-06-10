# redux-lazy

Generating constants, action types, action creators, reducers and containers for you.

[![NPM](https://nodei.co/npm/redux-lazy.png)](https://npmjs.org/package/redux-lazy)

[![npm version](https://badge.fury.io/js/redux-lazy.svg)](https://badge.fury.io/js/redux-lazy)
[![Build Status](https://travis-ci.org/evheniy/redux-lazy.svg?branch=master)](https://travis-ci.org/evheniy/redux-lazy)
[![Coverage Status](https://coveralls.io/repos/github/evheniy/redux-lazy/badge.svg?branch=master)](https://coveralls.io/github/evheniy/redux-lazy?branch=master)
[![Linux Build](https://img.shields.io/travis/evheniy/redux-lazy/master.svg?label=linux)](https://travis-ci.org/evheniy/)
[![Windows Build](https://img.shields.io/appveyor/ci/evheniy/redux-lazy/master.svg?label=windows)](https://ci.appveyor.com/project/evheniy/redux-lazy)

[![Dependency Status](https://david-dm.org/evheniy/redux-lazy.svg)](https://david-dm.org/evheniy/redux-lazy)
[![devDependency Status](https://david-dm.org/evheniy/redux-lazy/dev-status.svg)](https://david-dm.org/evheniy/redux-lazy#info=devDependencies)
[![NSP Status](https://img.shields.io/badge/NSP%20status-no%20vulnerabilities-green.svg)](https://travis-ci.org/evheniy/redux-lazy)

[![Known Vulnerabilities](https://snyk.io/test/github/evheniy/redux-lazy/badge.svg)](https://snyk.io/test/github/evheniy/redux-lazy)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/evheniy/redux-lazy/master/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/evheniy/redux-lazy.svg)](https://github.com/evheniy/redux-lazy/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/evheniy/redux-lazy.svg)](https://github.com/evheniy/redux-lazy/network)
[![GitHub issues](https://img.shields.io/github/issues/evheniy/redux-lazy.svg)](https://github.com/evheniy/redux-lazy/issues)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/evheniy/redux-lazy.svg?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=%5Bobject%20Object%5D)


## How to install

     npm i -S redux-lazy

## How to use

```javascript
import RL from 'redux-lazy';

const rl = new RL('post');

rl.addAction('title', { title: '' });

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

## Articles

**React — redux for lazy developers:**
 * [Part 1](https://hackernoon.com/react-redux-for-lazy-developers-b551f16a456f)
 * [Part 2](https://hackernoon.com/react-redux-for-lazy-developers-part-2-d0c60123592f)
 * Part 3


## Documentation

 * [Install](https://github.com/evheniy/redux-lazy/blob/master/docs/install.md)
 * [Types](https://github.com/evheniy/redux-lazy/blob/master/docs/types.md)
 * [Actions](https://github.com/evheniy/redux-lazy/blob/master/docs/actions.md)
 * [Reducer](https://github.com/evheniy/redux-lazy/blob/master/docs/reducer.md)
 * [Container](https://github.com/evheniy/redux-lazy/blob/master/docs/container.md)
