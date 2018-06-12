import { connect } from 'react-redux'
import InsertCourse from '../../../../components/Profile/Admin/Courses/InsertCourse'
import addNewCourse from '../../../../redux/actions/Admin/AddCourse'

const mapStateToProps = (state, ownProps) => {

  if(ownProps.location.state.fromDegree === false) {
    return {
      adding: state.admin.adding,
      success: state.admin.success
    }
  } else {
    return {
      adding: state.admin.adding,
      success: state.admin.success,
      year: ownProps.location.state.year,
      degreeUnicode: ownProps.location.state.degreeUnicode
    }
  }
}

const mapDispatchToProps = {
  addCourse: addNewCourse
}

const InsertCourseContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InsertCourse)

export default InsertCourseContainer