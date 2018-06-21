// import React from 'react';
// import chai from 'chai';
// // import sinon from 'sinon';
// import AcademicYears from '../../components/Profile/Admin/AcademicYears/AcademicYears';
// // import {mount} from 'jsdom'
// import { mount, shallow } from 'enzyme'
// // console.log('LoginButton.test.js')

// describe('<AcademicYears/>', () => {
//   it('renders without exploding', () => {
//     const wrapper = shallow(<AcademicYears />);
//     chai.expect(wrapper.find(AcademicYears)).to.have.length(1);
//   });
// });

// import React from 'react';
// import ReactDOM from 'react-dom';
// import { renderIntoDocument } from 'react-dom/test-utils';
// import { expect } from 'chai';
// import AcademicYears from '../../components/Profile/Admin/AcademicYears/AcademicYears';
// import { Provider } from 'react-redux';
// import { browserHistory, Router } from 'react-router';
// import createStore from 'redux';

// describe('AcademicYearContainer', () => {
//   const mockStore = {
//     academicYears: [{ year: '2017-2018' }],
//     loading: false,
//     success: true,
//     empty: false,
//     somethingChanged: false
//   };
//   // const store = createStore(mockStore);
//   const renderer = renderIntoDocument(
//     <Provider store={mockStore} key="provider">
//       <Router history={browserHistory}>
//         <AcademicYears />
//       </Router>
//     </Provider>
//   );
//   const dom = ReactDOM.findDOMNode(renderer);

//   it('should render correctly', () => {
//     return expect(renderer).to.be.ok;
//   });
// })

//   // it('should render with correct value', () => {
//   //   const text = dom.getElementsByTagName('strong')[0].textContent;
//   //   expect(text).to.equal(mockStore.info.data.message);
//   // });

//   // it('should render with a reload button', () => {
//   //   const text = dom.getElementsByTagName('button')[0].textContent;
//   //   expect(text).to.be.a('string');
//   // });

// //   it('should render the correct className', () => {
// //     const styles = require('components/InfoBar/InfoBar.scss');
// //     expect(styles.infoBar).to.be.a('string');
// //     expect(dom.className).to.include(styles.infoBar);
// //   });
// // });