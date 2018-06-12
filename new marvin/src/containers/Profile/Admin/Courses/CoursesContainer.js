import { connect } from 'react-redux'

import Courses from '../../../../components/Profile/Admin/Courses/Courses'

// import { readCoursesFromDatabase } from '../../../../redux/actions/Admin/readAdminData'
import { readCoursesFromDatabase } from '../../../../redux/actions/Admin/readCourses'

const mapStateToProps = (state, ownProps) => {
  return {
    data: state.admin.courses.payload,
    loading: state.admin.courses.loading,
    success: state.admin.courses.success

  }
}

const mapDispatchToProps = {
  readCoursesData: readCoursesFromDatabase
}

const CoursesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Courses)

export default CoursesContainer