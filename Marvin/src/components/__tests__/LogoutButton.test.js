import React from 'react';
import chai from 'chai';
import sinon from 'sinon';
import LogoutButton from '../App/LogoutButton';
import { mount } from 'enzyme'
// // console.log('LogoutButton.test.js')

describe('<LogoutButton/>', () => {
    it('renders without exploding', () => {
        const wrapper = mount(<LogoutButton />);
        chai.expect(wrapper.find(LogoutButton).length).to.equal(1);
    });
});