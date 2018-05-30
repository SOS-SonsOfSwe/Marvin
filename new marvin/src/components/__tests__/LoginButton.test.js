import React from 'react';
import { shallow } from 'enzyme';
import chai from 'chai';
import sinon from 'sinon';
import LoginButton from '../Buttons/LoginButton';
// import {mount} from 'jsdom'
import {mount} from 'enzyme'
// console.log('LoginButton.test.js')

describe('<LoginButton/>', () => {
    it('renders without exploding', () => {
        const wrapper = mount(<LoginButton />);
        chai.expect(wrapper.find(LoginButton)).to.have.length(1);
    });
});