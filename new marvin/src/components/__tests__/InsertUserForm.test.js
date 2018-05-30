 import React from 'react';
 import { shallow } from 'enzyme';
 import {mount} from 'enzyme'
 import chai from 'chai'
 import expect from 'chai';
 import sinon from 'sinon';
 import InsertUserForm from '../InsertUser/InsertUserForm';
 

 describe('<InsertUserForm/>', () => {
     it('renders without exploding', () => {
         const wrapper = mount(<InsertUserForm />);
         chai.expect(wrapper.find(InsertUserForm).length).to.equal(1);
     });
  });