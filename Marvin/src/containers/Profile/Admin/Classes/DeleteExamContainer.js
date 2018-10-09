import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import DeleteExam from '../../../../components/Profile/Admin/Classes/DeleteExam'
// import { readDegreesFromDatabase } from '../../../../redux/actions/Admin/readAdminData'
import { deleteExamFromDatabase } from '../../../../redux/actions/Admin/deleteExam'
// This container is read-only, so there's no need for mapping dispatch actions to the store.
// This connect is only for connecting the AcademicYears component to the store

const mapStateToProps = (state, ownProps) => {
  return {
    examUnicode: ownProps.location.state.examUnicode,
    classUnicode: ownProps.location.state.classUnicode
  }
}

// const mapDispatchToProps = {
//   readDegreeData: readDegreesFromDatabase
// }
const mapDispatchToProps = (dispatch) => {
  return {
    deleteExam: bindActionCreators(deleteExamFromDatabase, dispatch),
  }
}

const DeleteExamContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteExam)

export default DeleteExamContainer
// export default connect(state => ({ uniData: state.user.data }))(AcademicYears)