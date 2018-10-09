import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import DeleteAcademicYear from '../../../../components/Profile/Admin/AcademicYears/DeleteAcademicYear'
// import { readDegreesFromDatabase } from '../../../../redux/actions/Admin/readAdminData'
import { deleteAcademicYearFromDatabase } from '../../../../redux/actions/Admin/deleteAcademicYear'
// This container is read-only, so there's no need for mapping dispatch actions to the store.
// This connect is only for connecting the AcademicYears component to the store

const mapStateToProps = (state, ownProps) => {
  return {
    year: ownProps.location.state.year
  }
}

// const mapDispatchToProps = {
//   readDegreeData: readDegreesFromDatabase
// }
const mapDispatchToProps = (dispatch) => {
  return {
    deleteAcademicYear: bindActionCreators(deleteAcademicYearFromDatabase, dispatch),
  }
}

const DeleteAcademicYearContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteAcademicYear)

export default DeleteAcademicYearContainer
// export default connect(state => ({ uniData: state.user.data }))(AcademicYears)