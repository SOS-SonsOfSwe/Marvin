import React from 'react';
import { mount } from 'enzyme'
import chai from 'chai'
import NotFound from '../NotFound/NotFound';


describe('<NotFound/>', () => {
    it('renders without exploding', () => {
        const wrapper = mount(<NotFound />);
        chai.expect(wrapper.find(NotFound).length).to.equal(1);
    });
});