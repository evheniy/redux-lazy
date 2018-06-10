import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { spy } from 'sinon';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import PostContainer, { POST } from './fixtures/container';

import RL from '../src';

const rl = new RL('post');

rl.addAction('title', { title: '' });
rl.addAction('body', { body: '' });
rl.addAction('submit');

const {
  actions: rlActions,
  nameSpace,
  Container: RLPostContainer,
  mapStateToProps,
  mapDispatchToProps,
} = rl.flush();

describe('Testing container', () => {
  describe('Redux', () => {
    it('should test nameSpace', () => {
      expect(POST).to.be.equal('@@post/POST');
    });

    it('should test container', () => {
      const Component = spy(() => null);
      const Container = PostContainer(Component);

      const title = 'title';
      const body = 'body';

      const mockStore = configureMockStore([]);
      const store = mockStore({
        [POST]: {
          title,
          body,
        },
      });

      const wrapper = mount(<Provider store={store}><Container /></Provider>);

      expect(wrapper.find(Component)).to.have.length(1);

      const props = wrapper.find(Component).props();

      expect(props.title).to.be.equal(title);
      expect(props.body).to.be.equal(body);
      expect(props.titleAction).to.be.a('function');
      expect(props.bodyAction).to.be.a('function');
      expect(props.submitAction).to.be.a('function');
    });
  });

  describe('Redux Lazy', () => {
    it('should test nameSpace', () => {
      expect(nameSpace).to.be.equal('@@post/POST');
      expect(nameSpace).to.be.equal(POST);
    });

    it('should test container', () => {
      const Component = spy(() => null);
      const Container = RLPostContainer(Component);

      const title = 'title';
      const body = 'body';

      const mockStore = configureMockStore([]);
      const store = mockStore({
        [nameSpace]: {
          title,
          body,
        },
      });

      const wrapper = mount(<Provider store={store}><Container /></Provider>);

      expect(wrapper.find(Component)).to.have.length(1);

      const props = wrapper.find(Component).props();

      expect(props.title).to.be.equal(title);
      expect(props.body).to.be.equal(body);
      expect(props.titleAction).to.be.a('function');
      expect(props.bodyAction).to.be.a('function');
      expect(props.submitAction).to.be.a('function');
    });

    it('should test mapStateToProps', () => {
      const title = 'title';
      const body = 'body';

      const state = {
        [nameSpace]: {
          title,
          body,
        },
      };

      const props = mapStateToProps(state);

      expect(props).to.be.eql({ title, body });
    });

    it('should test mapDispatchToProps', () => {
      expect(mapDispatchToProps).to.be.a('object');

      expect(mapDispatchToProps).to.be.eql(rlActions);

      expect(mapDispatchToProps.titleAction).to.be.a('function');
      expect(mapDispatchToProps.bodyAction).to.be.a('function');
      expect(mapDispatchToProps.submitAction).to.be.a('function');
    });
  });
});
