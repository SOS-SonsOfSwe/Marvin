import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import DeleteDegreeCourse from '../../../../components/Profile/Admin/DegreeCourses/DeleteDegreeCourse'
// import { readDegreeCoursesFromDatabase } from '../../../../redux/actions/Admin/readAdminData'
import { deleteDegreeCourseFromDatabase } from '../../../../redux/actions/Admin/deleteDegreeCourse'
// This container is read-only, so there's no need for mapping dispatch actions to the store.
// This connect is only for connecting the AcademicYears component to the store

const mapStateToProps = (state, ownProps) => {
  return {
    year: ownProps.location.state.year,
    degreeUnicode: ownProps.location.state.degreeUnicode
  }
}

// const mapDispatchToProps = {
//   readDegreeData: readDegreeCoursesFromDatabase
// }
const mapDispatchToProps = (dispatch) => {
  return {
    deleteDegreeCourse: bindActionCreators(deleteDegreeCourseFromDatabase, dispatch),
  }
}

const DeleteDegreeCourseContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteDegreeCourse)

export default DeleteDegreeCourseContainer
// export default connect(state => ({ uniData: state.user.data }))(AcademicYears)