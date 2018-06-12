import { connect } from 'react-redux'
import InsertDegreeCourse from '../../../../components/Profile/Admin/DegreeCourses/InsertDegreeCourse'
import addNewDegreeCourse from '../../../../redux/actions/Admin/AddDegreeCourse'

const mapStateToProps = (state, ownProps) => {
  if (ownProps.location.state.fromAcademic === false) {
    return {
      adding: state.admin.adding,
      success: state.admin.success,
      fromAcademic: false
    }
  }

  else {
    return {
      adding: state.admin.adding,
      success: state.admin.success,
      fromAcademic: true,
      year: ownProps.location.state.year
    }
  }
}

const mapDispatchToProps = {
  addDegreeCourse: addNewDegreeCourse
}

const InsertDegreeCourseContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InsertDegreeCourse)

export default InsertDegreeCourseContainer