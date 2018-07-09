import React from 'react';
import {mount} from 'enzyme'
import chai from 'chai'
import sinon from 'sinon';
import Help from '../Help/Help';


describe('<Help/>', () => {
    it('renders without exploding', () => {
        const wrapper = mount(<Help />);
        chai.expect(wrapper.find(Help).length).to.equal(1);
    });
 });