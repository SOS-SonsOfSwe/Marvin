import React from 'react';
import { shallow } from 'enzyme';
import chai from 'chai';
import expect from 'chai'
import sinon from 'sinon';
import LogoutButton from '../Buttons/LogoutButton';

// console.log('LogoutButton.test.js')

describe('<LogoutButton/>', () => {
    it('renders without exploding', () => {
        const wrapper = shallow(<LogoutButton />);
        chai.expect(wrapper.find(LogoutButton).length).to.equal(0);
    });
});