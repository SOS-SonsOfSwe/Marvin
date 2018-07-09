import React from 'react';
import { mount } from 'enzyme'
import chai from 'chai'
import sinon from 'sinon';
import SignUpForm from '../SignUp/SignUpForm';


describe('<SignUpForm/>', () => {
    it('renders without exploding', () => {
        const wrapper = mount(<SignUpForm />);
        chai.expect(wrapper.find(SignUpForm).length).to.equal(1);
    });
});