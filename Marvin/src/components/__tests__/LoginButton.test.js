import React from 'react';
import chai from 'chai';
import sinon from 'sinon';
import LoginButton from '../App/LoginButton';
// import {mount} from 'jsdom'
import { mount } from 'enzyme'
// // console.log('LoginButton.test.js')

describe('<LoginButton/>', () => {
    it('renders without exploding', () => {
        const wrapper = mount(<LoginButton />);
        chai.expect(wrapper.find(LoginButton)).to.have.length(1);
    });
});