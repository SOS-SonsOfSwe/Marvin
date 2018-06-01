import React from 'react';
import { mount } from 'enzyme'
import chai from 'chai'
// import sinon from 'sinon';
import Home from '../Home/Home';


describe('<Home/>', () => {
    it('renders without exploding', () => {
        const wrapper = mount(<Home />);
        chai.expect(wrapper.find(Home).length).to.equal(1);
    });
});