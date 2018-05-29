import React from 'react';
import { shallow } from 'enzyme';
import chai from 'chai';
import sinon from 'sinon';
import LoginButton from '../Buttons/LoginButton';

console.log('LoginButton.test.js')

const wrapper = shallow(<LoginButton />);

describe('LoginButton Component', () => {
    it('change prova', () => {

        chai.expect(wrapper.find('className')
            .text())
            .to.equal('pure-menu-link');
    });
});