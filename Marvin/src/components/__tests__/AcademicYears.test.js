 import { shallow } from 'enzyme'
 import React from 'react';
 import { expect } from 'chai';
 import AcademicYears from '../../components/Profile/Admin/AcademicYears/AcademicYears';
 import { readAcademicYearsFromDatabase } from '../../redux/actions/Admin/readAcademicYears';

 describe('AcademicYearContainer', () => {

   function setup(years, load, succ, emp, som){
    const mockStore = {
      academicYears: years,
      loading: load,
      success: succ,
      empty: emp,
      somethingChanged: som,
      //readAcademicData: readAcademicYearsFromDatabase //che cazzo devo farci con questa?
    };

    return shallow(<AcademicYears {...mockStore}/>);
   }
  
  it("The page load the correct number of academic years", () =>{
    const wrapper = setup(
      [{ year: '2017-2018' }, {year: '2016-2017'}, {year: '2015-2016'}],
      false,
      true,
      false,
      true
    )
    expect(wrapper.find('Row').length).equals(3);
    expect(wrapper.find('LoadingData').length).equals(0);


  })

  it("The page is loading", () =>{
    const wrapper = setup(
      [],
      true,
      true,
      false,
      true
    )

    expect(wrapper.find('Row').length).equals(0);
    expect(wrapper.find('LoadingData').length).equals(1);
  })

  it("Data are no loading", () =>{
    const wrapper = setup(
      [],
      true,
      false,
      false,
      true
    )
     expect(wrapper.contains(<div>There was an error...</div>)).equals(true);
  })  
  })