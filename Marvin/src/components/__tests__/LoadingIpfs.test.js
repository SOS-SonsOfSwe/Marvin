import React from 'react';
import { mount } from 'enzyme'
import chai from 'chai'
import sinon from 'sinon';
import LoadingIpfs from '../Loading/LoadingIpfs';


describe('<LoadingIpfs/>', () => {
    it('renders without exploding', () => {
        const wrapper = mount(<LoadingIpfs />);
        chai.expect(wrapper.find(LoadingIpfs).length).to.equal(1);
    });
});