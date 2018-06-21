import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import DeleteCourse from '../../../../components/Profile/Admin/DegreeCourses/DeleteCourse'
// import { readDegreeCoursesFromDatabase } from '../../../../redux/actions/Admin/readAdminData'
import { deleteCourseFromDatabase } from '../../../../redux/actions/Admin/deleteCourse'
// This container is read-only, so there's no need for mapping dispatch actions to the store.
// This connect is only for connecting the AcademicYears component to the store

const mapStateToProps = (state, ownProps) => {
  return {
    // year: ownProps.location.state.year
  }
}

// const mapDispatchToProps = {
//   readDegreeData: readDegreeCoursesFromDatabase
// }
const mapDispatchToProps = (dispatch) => {
  return {
    deleteCourse: bindActionCreators(deleteCourseFromDatabase, dispatch),
  }
}

const DeleteCourseContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteCourse)

export default DeleteCourseContainer
// export default connect(state => ({ uniData: state.user.data }))(AcademicYears)