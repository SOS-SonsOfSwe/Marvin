import { connect } from 'react-redux'
import InsertClass from '../../../../components/Profile/Admin/Classes/InsertClass'
import addNewClass from '../../../../redux/actions/Admin/AddClass'
import { bindActionCreators } from 'redux'

import { readDegreesFromDatabase } from '../../../../redux/actions/Admin/readDegrees'
import { readAcademicYearsFromDatabase } from '../../../../redux/actions/Admin/readAcademicYears'


const mapStateToProps = (state, ownProps) => {
  return {
    adding: state.admin.adding,
    success: state.admin.success,
    year: ownProps.location.state.year,
    degreeUnicode: ownProps.location.state.degreeUnicode,

    degrees: state.admin.degrees.payload,
    successDegree: state.admin.degrees.success,
    academicYears: state.admin.academicYears.payload,
    loadingDegree: state.admin.degrees.loading,
    loadingAcademic: state.admin.academicYears.loading,
    emptyClasses: state.admin.classes.empty,
    emptyDegrees: state.admin.degrees.empty,
    emptyAcademicYears: state.admin.academicYears.empty,

  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    addClass: addNewClass,
    readDegreeData: bindActionCreators(readDegreesFromDatabase, dispatch),
    readAcademicData: bindActionCreators(readAcademicYearsFromDatabase, dispatch)
  }
}


const InsertClassContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InsertClass)

export default InsertClassContainer