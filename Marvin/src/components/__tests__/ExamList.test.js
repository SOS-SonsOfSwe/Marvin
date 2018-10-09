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



//test di prova...
/*
import ExamList from '../Profile/Commons/ExamList';
import { shallow } from 'enzyme'
import React from 'react';
import { expect } from 'chai';

describe('AcademicYearContainer', () => {
    function setup(degree, Sclass, typology, date){
        const mockStore = {
          degree: degree,
          Sclass: Sclass,
          typology: typology,
          date: date,
        };
    
        return shallow(<AcademicYears {...mockStore}/>);
    }

    it("The page load the correct number of exams", () =>{
        const wrapper = setup(
          'informatica',
          '123',
          'scienze',
          [{date: '2017-2018'}]
        )
        expect(wrapper.find('Row').length).equals(1);
        expect(wrapper.find('LoadingData').length).equals(0);
    })

})
*/
