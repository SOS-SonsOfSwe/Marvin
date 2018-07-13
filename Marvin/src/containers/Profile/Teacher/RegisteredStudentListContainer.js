import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import RegisteredStudentList from '../../../components/Profile/Teacher/RegisteredStudentsList'
// import { readDegreesFromDatabase } from '../../../../redux/actions/Admin/readAdminData'
//import { readClassesFromDatabase } from '../../../redux/actions/Teacher/readClasses'
import { readExamsFromDatabase } from '../../../redux/actions/Teacher/readExams'
import { readStudentsPerExam } from '../../../redux/actions/Teacher/readStudents'
import setMarkPerExams from '../../../redux/actions/Teacher/setMarksPerExam';
// This container is read-only, so there's no need for mapping dispatch actions to the store.
// This connect is only for connecting the AcademicYears component to the store

const mapStateToProps = (state, ownProps) => {
  return {
    examUnicode: ownProps.location.state.examUnicode,
    classUnicode: ownProps.location.state.classUnicode,

    exams: state.teacher.exams.payload,
    students: state.teacher.students.payload, // you can access the badge number via: this.props.students.badgeNumber

    // loadingExams: state.teacher.exams.loading,
    loadingStudents: state.teacher.students.loading,

    success: state.teacher.students.success,
    // somethingChanged: state.admin.degrees.somethingChanged,
    //emptyExams: state.teacher.exams.empty,
    emptyStudents: state.teacher.students.empty,

    ipfsLoading: state.ipfs.loading
  }
}

// const mapDispatchToProps = {
//   readDegreeData: readDegreesFromDatabase
// }
const mapDispatchToProps = (dispatch) => {
  return {
    //readClassesData: bindActionCreators(readClassesFromDatabase, dispatch),
    readExamsData: bindActionCreators(readExamsFromDatabase, dispatch),
    setMarksData: bindActionCreators(setMarkPerExams, dispatch),
    readStudentsData: bindActionCreators(readStudentsPerExam, dispatch)
  }
}

const RegisteredStudentListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisteredStudentList)

export default RegisteredStudentListContainer
// export default connect(state => ({ uniData: state.user.data }))(AcademicYears)