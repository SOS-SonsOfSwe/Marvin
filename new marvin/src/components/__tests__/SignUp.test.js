import React from 'react';
import ReactDOM from 'react-dom';
import {expect} from 'chai';
import SignUp from '../SignUp/SignUp';
import SignUpForm from '../SignUp/SignUpForm';
import {createStore, applyMiddleware} from 'redux';
import { browserHistory, Router } from 'react-router';
import {Provider} from 'react-redux';
import combineReducers from 'redux';
import sinon from 'sinon';
import {mount} from 'enzyme';
import userReducer from '../../redux/reducers/userReducer';
import studentReducer from '../../redux/reducers/studentReducer';
import { renderIntoDocument } from 'react-dom/test-utils';
import store from '../../store';

 describe('SignUp', () => {
   const mockStore = { 
    todos: []
   };

  const rootReducer=userReducer;

  const store = createStore(rootReducer, mockStore, applyMiddleware);
  const renderer = renderIntoDocument(
     <Provider store={mockStore} key="provider">
       <Router history={browserHistory}>
         <SignUp />
       </Router>
     </Provider>
   );
   const dom = ReactDOM.findDOMNode(renderer);

   it('should render correctly', () => {
     return expect(renderer).to.be.ok;
   });
 })

 