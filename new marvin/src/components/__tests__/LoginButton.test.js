import React from 'react';
import { shallow } from 'enzyme';
import chai from 'chai';
import sinon from 'sinon';
import LoginButton from '../Buttons/LoginButton';

// console.log('LoginButton.test.js')

describe('<LoginButton/>', () => {
    it('renders without exploding', () => {
        const wrapper = shallow(<LoginButton />);
        chai.expect(wrapper.find(LoginButton).length).to.equal(0);
    });
});