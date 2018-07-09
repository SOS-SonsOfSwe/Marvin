import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import DeleteDegree from '../../../../components/Profile/Admin/Degrees/DeleteDegree'
// import { readDegreesFromDatabase } from '../../../../redux/actions/Admin/readAdminData'
import { deleteDegreeFromDatabase } from '../../../../redux/actions/Admin/deleteDegree'
// This container is read-only, so there's no need for mapping dispatch actions to the store.
// This connect is only for connecting the AcademicYears component to the store

const mapStateToProps = (state, ownProps) => {
  return {
    year: ownProps.location.state.year,
    degreeUnicode: ownProps.location.state.degreeUnicode
  }
}

// const mapDispatchToProps = {
//   readDegreeData: readDegreesFromDatabase
// }
const mapDispatchToProps = (dispatch) => {
  return {
    deleteDegree: bindActionCreators(deleteDegreeFromDatabase, dispatch),
  }
}

const DeleteDegreeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteDegree)

export default DeleteDegreeContainer
// export default connect(state => ({ uniData: state.user.data }))(AcademicYears)