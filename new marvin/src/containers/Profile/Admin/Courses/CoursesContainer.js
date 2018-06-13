import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Courses from '../../../../components/Profile/Admin/Courses/Courses'

// import { readCoursesFromDatabase } from '../../../../redux/actions/Admin/readAdminData'
import { readCoursesFromDatabase } from '../../../../redux/actions/Admin/readCourses'
import { readDegreeCoursesFromDatabase } from '../../../../redux/actions/Admin/readDegreeCourses'
import { readAcademicYearsFromDatabase } from '../../../../redux/actions/Admin/readAcademicYears'

const mapStateToProps = (state, ownProps) => {
  return {
    degreeCourses: state.admin.degreeCourses.payload,
    successDegree: state.admin.degreeCourses.success,
    academicYears: state.admin.academicYears.payload,
    courses: state.admin.courses.payload,
    loadingCourses: state.admin.courses.loading,
    loadingDegree: state.admin.degreeCourses.loading,
    loadingAcademic: state.admin.academicYears.loading,
    success: state.admin.courses.success,
    somethingChanged: state.admin.degreeCourses.somethingChanged,
    emptyCourses: state.admin.courses.empty,
    emptyDegreeCourses: state.admin.degreeCourses.empty,
    emptyAcademicYears: state.admin.academicYears.empty,

    ipfsLoading: state.ipfs.loading

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    readCoursesData: bindActionCreators(readCoursesFromDatabase, dispatch),
    readDegreeData: bindActionCreators(readDegreeCoursesFromDatabase, dispatch),
    readAcademicData: bindActionCreators(readAcademicYearsFromDatabase, dispatch)
  }
}

const CoursesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Courses)

export default CoursesContainer