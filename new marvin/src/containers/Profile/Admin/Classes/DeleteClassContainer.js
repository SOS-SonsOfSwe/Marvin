import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import DeleteClass from '../../../../components/Profile/Admin/Degrees/DeleteClass'
// import { readDegreesFromDatabase } from '../../../../redux/actions/Admin/readAdminData'
import { deleteClassFromDatabase } from '../../../../redux/actions/Admin/deleteClass'
// This container is read-only, so there's no need for mapping dispatch actions to the store.
// This connect is only for connecting the AcademicYears component to the store

const mapStateToProps = (state, ownProps) => {
  return {
    degreeUnicode: ownProps.location.state.degreeUnicode,
    classUnicode: ownProps.location.state.classUnicode
  }
}

// const mapDispatchToProps = {
//   readDegreeData: readDegreesFromDatabase
// }
const mapDispatchToProps = (dispatch) => {
  return {
    deleteClass: bindActionCreators(deleteClassFromDatabase, dispatch),
  }
}

const DeleteClassContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteClass)

export default DeleteClassContainer
// export default connect(state => ({ uniData: state.user.data }))(AcademicYears)