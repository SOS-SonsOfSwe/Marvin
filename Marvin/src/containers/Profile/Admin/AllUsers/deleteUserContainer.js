import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import DeleteAdministrator from '../../../../components/Profile/Admin/onlyUniversity/Administrators/DeleteAdministrator'
import DeleteTeacher from '../../../../components/Profile/Admin/Teachers/DeleteTeacher'
import DeleteStudent from '../../../../components/Profile/Admin/Students/DeleteStudent'
// import { readDegreesFromDatabase } from '../../../../redux/actions/Admin/readAdminData'
import { deleteUserFromDatabase } from '../../../../redux/actions/Admin/deleteUser'
// This container is read-only, so there's no need for mapping dispatch actions to the store.
// This connect is only for connecting the AcademicYears component to the store

const mapStateToProps = (state, ownProps) => {
  return {
    badgeNumber: ownProps.location.state.badgeNumber,
    FC: ownProps.location.state.FC
  }
}

// const mapDispatchToProps = {
//   readDegreeData: readDegreesFromDatabase
// }
const mapDispatchToProps = (dispatch) => {
  return {
    deleteUser: bindActionCreators(deleteUserFromDatabase, dispatch),
  }
}

export const DeleteAdministratorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteAdministrator)

export const DeleteTeacherContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteTeacher)

export const DeleteStudentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteStudent)

// export DeleteAdministratorContainer
// export default connect(state => ({ uniData: state.user.data }))(AcademicYears)