import { connect } from 'react-redux'
import DegreeCourses from '../../../../components/Profile/Admin/DegreeCourses/DegreeCourses'
import { readDegreeCoursesFromDatabase } from '../../../../redux/actions/Read/readAdminData'

// This container is read-only, so there's no need for mapping dispatch actions to the store.
// This connect is only for connecting the AcademicYears component to the store

const mapStateToProps = (state, ownProps) => {
  return {
    data: state.admin.data,
    loading: state.admin.loading,
    success: state.admin.success
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    readDegreeData: (years) => {
      dispatch(readDegreeCoursesFromDatabase(years))
    }
  }
}

const DegreeCoursesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DegreeCourses)

export default DegreeCoursesContainer
// export default connect(state => ({ uniData: state.user.data }))(AcademicYears)