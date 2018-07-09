import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ExamsTeacherList from '../../../components/Profile/Teacher/ExamsTeacherList'
// import { readDegreesFromDatabase } from '../../../../redux/actions/Admin/readAdminData'
import { readClassesFromDatabase } from '../../../redux/actions/Teacher/readClasses'
import { readExamsFromDatabase } from '../../../redux/actions/Teacher/readExams'
// This container is read-only, so there's no need for mapping dispatch actions to the store.
// This connect is only for connecting the AcademicYears component to the store

const mapStateToProps = (state, ownProps) => {
  return {
    classes: state.teacher.classes.payload,
    exams: state.teacher.exams.payload,
    loadingClasses: state.teacher.classes.loading,
    loadingExams: state.teacher.exams.loading,
    success: state.teacher.classes.success,
    // somethingChanged: state.admin.degrees.somethingChanged,
    emptyClasses: state.teacher.classes.empty,
    emptyExams: state.teacher.exams.empty,

    ipfsLoading: state.ipfs.loading
  }
}

// const mapDispatchToProps = {
//   readDegreeData: readDegreesFromDatabase
// }
const mapDispatchToProps = (dispatch) => {
  return {
    readClassesData: bindActionCreators(readClassesFromDatabase, dispatch),
    readExamsData: bindActionCreators(readExamsFromDatabase, dispatch)
  }
}

const ExamsTeacherListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExamsTeacherList)

export default ExamsTeacherListContainer
// export default connect(state => ({ uniData: state.user.data }))(AcademicYears)