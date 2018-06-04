import { connect } from 'react-redux'
import DegreeCourses from '../../../../components/Profile/Admin/DegreeCourses/DegreeCourses'
import { readDegreeCoursesFromDatabase } from '../../../../redux/actions/Admin/readAdminData'

// This container is read-only, so there's no need for mapping dispatch actions to the store.
// This connect is only for connecting the AcademicYears component to the store

const mapStateToProps = (state, ownProps) => {
  return {
    degreeCoursesData: state.admin.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    readDegreeData: () => {
      dispatch(readDegreeCoursesFromDatabase())
    }
  }
}

const DegreeCoursesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DegreeCourses)

export default DegreeCoursesContainer
// export default connect(state => ({ uniData: state.user.data }))(AcademicYears)