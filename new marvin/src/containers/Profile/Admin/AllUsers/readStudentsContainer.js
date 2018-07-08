import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Students from '../../../../components/Profile/Admin/Students/Students'
// import Classes from '../../../../components/Profile/Admin/Classes/Classes'

// import { readClassesFromDatabase } from '../../../../redux/actions/Admin/readStudentData'
import { readUsersFromDatabase } from '../../../../redux/actions/Admin/readUsers'

const mapStateToProps = (state, ownProps) => {
  return {
    students: state.admin.readStudents.payload,
    success: state.admin.readStudents.success,
    loading: state.admin.readStudents.loading,
    somethingChanged: state.admin.readStudents.somethingChanged,
    empty: state.admin.readStudents.empty,
    //... qui ci vanno le altre variabili per la gestione della lettura, ovvero:
    // readStudents
    // readStudents
    // this is the way to access the users' infos
    ipfsLoading: state.ipfs.loading

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // these are: student, admin, student. Choose which one you want!
    readStudents: bindActionCreators(readUsersFromDatabase, dispatch)
    // see 
  }
}

const readStudentsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Students)

export default readStudentsContainer