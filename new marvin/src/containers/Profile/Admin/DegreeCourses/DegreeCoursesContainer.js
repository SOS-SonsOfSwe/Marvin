import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import DegreeCourses from '../../../../components/Profile/Admin/DegreeCourses/DegreeCourses'
// import { readDegreeCoursesFromDatabase } from '../../../../redux/actions/Admin/readAdminData'
import { readDegreeCoursesFromDatabase } from '../../../../redux/actions/Admin/readDegreeCourses'
import { readAcademicYearsFromDatabase } from '../../../../redux/actions/Admin/readAcademicYears'
// This container is read-only, so there's no need for mapping dispatch actions to the store.
// This connect is only for connecting the AcademicYears component to the store

const mapStateToProps = (state, ownProps) => {
  return {
    degreeCourses: state.admin.degreeCourses.payload,
    academicYears: state.admin.academicYears.payload,
    loadingDegree: state.admin.degreeCourses.loading,
    loadingAcademic: state.admin.academicYears.loading,
    success: state.admin.degreeCourses.success,
    somethingChanged: state.admin.degreeCourses.somethingChanged,
    emptyDegreeCourses: state.admin.degreeCourses.empty,
    emptyAcademicYears: state.admin.academicYears.empty
  }
}

// const mapDispatchToProps = {
//   readDegreeData: readDegreeCoursesFromDatabase
// }
const mapDispatchToProps = (dispatch) => {
  return {
    readDegreeData: bindActionCreators(readDegreeCoursesFromDatabase, dispatch),
    readAcademicData: bindActionCreators(readAcademicYearsFromDatabase, dispatch)
  }
}

const DegreeCoursesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DegreeCourses)

export default DegreeCoursesContainer
// export default connect(state => ({ uniData: state.user.data }))(AcademicYears)