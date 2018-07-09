import React from 'react';
import { mount } from 'enzyme'
import chai from 'chai'
import LoadingUser from '../Loading/LoadingUser';

describe('<LoadingUser/>', () => {
    it('renders without exploding', () => {
        const wrapper = mount(<LoadingUser />);
        chai.expect(wrapper.find(LoadingUser).length).to.equal(1);
    });
});