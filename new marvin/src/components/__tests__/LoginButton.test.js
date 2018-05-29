import React from 'react';
import { shallow } from 'enzyme';
import chai from 'chai';
import sinon from 'sinon';
import LoginButton from '../Buttons/LoginButton';

describe('<LoginButton/>', () => {
    it('renders without exploding', () => {
        const wrapper = shallow(<LoginButton />);
        expect(wrapper.find(LoginButton).length).to.equal(1);
    });
});