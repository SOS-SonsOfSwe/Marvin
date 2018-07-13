import React from 'react';
import { shallow, mount } from 'enzyme'
import chai from 'chai'
// import sinon from 'sinon';
import ExamStudentList from '../Profile/Student/ExamsStudentList';
import readStudentExamsFromDatabase from '../../containers/Profile/Student/ExamsStudentListContainer';
import mapDispatchToProps from '../../containers/Profile/Student/ExamsStudentListContainer';


describe('<ExamStudentList/>', () => {

    function setup( ex, load, succ, ipfsL, emp, bN){
        const mockStore = {
            exams: ex,
            loading: load,
            success: succ,
            empty: emp,
            justDeleted,
            badgeNumber:bN,
            ipfsLoading: ipfsL,
            readExams:readStudentExamsFromDatabase
          //readAcademicData: readAcademicYearsFromDatabase //che cazzo devo farci con questa?
        };
        return mount(<ExamStudentList {...mockStore}/>);
    }

    it('renders without exploding', () => {
        const wrapper = setup(
            ["la mamma di silvio", ["Scritto", "lum250", "09/06/1993", "09:30"], "Filé"],
            false,
            true,
            false,
            false,
            "00",
        )
        console.log("aaaaaaaaaaa"+wrapper.debug());
        //expect(wrapper.find(ExamList).length).to.equal(1);
    });
});