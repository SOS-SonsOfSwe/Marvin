import React from 'react';
import chai from 'chai';
import sinon from 'sinon';
import {OnlyAuthLinks} from '../App/NavButtons';
// import {mount} from 'jsdom'
import { mount } from 'enzyme'
// console.log('LoginButton.test.js')

describe('<OnlyAuthLinks/>', () => {
    it('renders without exploding', () => {
        const wrapper = mount(<OnlyAuthLinks />);
        chai.expect(wrapper.find(OnlyAuthLinks)).to.have.length(1);
    });
});