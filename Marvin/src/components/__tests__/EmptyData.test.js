import React from 'react';
import { mount } from 'enzyme'
import chai from 'chai'
import sinon from 'sinon';
import EmptyData from '../Loading/EmptyData';


describe('<EmptyData/>', () => {
    it('renders without exploding', () => {
        const wrapper = mount(<EmptyData />);
        chai.expect(wrapper.find(EmptyData).length).to.equal(1);
    });
});