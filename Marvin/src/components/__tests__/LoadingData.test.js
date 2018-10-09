import React from 'react';
import { mount } from 'enzyme'
import chai from 'chai'
import sinon from 'sinon';
import LoadingData from '../Loading/LoadingData';


describe('<LoadingData/>', () => {
    it('renders without exploding', () => {
        const wrapper = mount(<LoadingData />);
        chai.expect(wrapper.find(LoadingData).length).to.equal(1);
    });
});