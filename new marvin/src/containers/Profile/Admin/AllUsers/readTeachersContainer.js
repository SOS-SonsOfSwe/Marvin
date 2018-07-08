import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Teachers from '../../../../components/Profile/Admin/Teachers/Teachers'
// import Classes from '../../../../components/Profile/Admin/Classes/Classes'

// import { readClassesFromDatabase } from '../../../../redux/actions/Admin/readAdminData'
import { readUsersFromDatabase } from '../../../../redux/actions/Admin/readUsers'

const mapStateToProps = (state, ownProps) => {
  return {
    teachers: state.admin.readTeachers.payload,
    success: state.admin.readTeachers.success,
    loading: state.admin.readTeachers.loading,
    somethingChanged: state.admin.readTeachers.somethingChanged,
    empty: state.admin.readTeachers.empty,
    //... qui ci vanno le altre variabili per la gestione della lettura, ovvero:
    // readTeachers
    // readStudents
    // this is the way to access the users' infos
    ipfsLoading: state.ipfs.loading

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // these are: teacher, admin, student. Choose which one you want!
    readTeachers: bindActionCreators(readUsersFromDatabase, dispatch)
    // see 
  }
}

const readTeachersContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Teachers)

export default readTeachersContainer