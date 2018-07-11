import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import ExamsTeacherList from '../../../components/Profile/Teacher/ExamsTeacherList'
// import { readDegreesFromDatabase } from '../../../../redux/actions/Admin/readAdminData'
import { readClassesFromDatabase } from '../../../redux/actions/Teacher/readClasses'
import { readExamsFromDatabase } from '../../../redux/actions/Teacher/readExams'
import { readStudentsPerExam } from '../../../redux/actions/Teacher/readStudents'
// This container is read-only, so there's no need for mapping dispatch actions to the store.
// This connect is only for connecting the AcademicYears component to the store

const mapStateToProps = (state, ownProps) => {
  return {
    classes: state.teacher.classes.payload,
    exams: state.teacher.exams.payload,
    students: state.teacher.students.payload, // you can access the badge number via: this.props.students.badgeNumber

    loadingClasses: state.teacher.classes.loading,
    loadingExams: state.teacher.exams.loading,
    loadingStudents: state.teacher.students.loading,

    success: state.teacher.students.success,
    // somethingChanged: state.admin.degrees.somethingChanged,
    emptyClasses: state.teacher.classes.empty,
    emptyExams: state.teacher.exams.empty,
    emptyStudents: state.teacher.students.empty,

    // ipfsLoading: state.ipfs.loading
  }
}

// const mapDispatchToProps = {
//   readDegreeData: readDegreesFromDatabase
// }
const mapDispatchToProps = (dispatch) => {
  return {
    readClassesData: bindActionCreators(readClassesFromDatabase, dispatch),
    readExamsData: bindActionCreators(readExamsFromDatabase, dispatch),
    // readStudentsPerExam(examUnicode)
    readStudentsData: bindActionCreators(readStudentsPerExam, dispatch)
  }
}

// const ExamsTeacherListContainer = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(ExamsTeacherList)

// export default ExamsTeacherListContainer
// export default connect(state => ({ uniData: state.user.data }))(AcademicYears)