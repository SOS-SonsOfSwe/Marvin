import React from 'react';
import { mount } from 'enzyme'
import chai from 'chai'
// import sinon from 'sinon';
import ExamList from '../Profile/Commons/ExamList';


describe('<ExamList/>', () => {
    it('renders without exploding', () => {
        const wrapper = mount(<ExamList />);
        chai.expect(wrapper.find(ExamList).length).to.equal(1);
    });
});