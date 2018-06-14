import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Professors from '../../../../components/Profile/Admin/Professors/Professors'
// import Courses from '../../../../components/Profile/Admin/Courses/Courses'

// import { readCoursesFromDatabase } from '../../../../redux/actions/Admin/readAdminData'
import { readUsersFromDatabase } from '../../../../redux/actions/Admin/readUsers'

const mapStateToProps = (state, ownProps) => {
  return {
    teachers: state.admin.readTeachers.payload
    //... qui ci vanno le altre variabili per la gestione della lettura, ovvero:
    // readAdmins
    // readStudents
    // this is the way to access the users' infos
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // these are: teacher, admin, student. Choose which one you want!
    readTeachers: bindActionCreators(readUsersFromDatabase('teacher'), dispatch)
    // see 
  }
}

const readTeachersContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Professors)

export default readTeachersContainer