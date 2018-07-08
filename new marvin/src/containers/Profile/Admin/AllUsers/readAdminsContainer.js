import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Administrators from '../../../../components/Profile/Admin/onlyUniversity/Administrators/Administrators'
// import Classes from '../../../../components/Profile/Admin/Classes/Classes'

// import { readClassesFromDatabase } from '../../../../redux/actions/Admin/readAdminData'
import { readUsersFromDatabase } from '../../../../redux/actions/Admin/readUsers'

const mapStateToProps = (state, ownProps) => {
  return {
    administrators: state.admin.readAdmins.payload,
    success: state.admin.readAdmins.success,
    loading: state.admin.readAdmins.loading,
    somethingChanged: state.admin.readAdmins.somethingChanged,
    empty: state.admin.readAdmins.empty,
    //... qui ci vanno le altre variabili per la gestione della lettura, ovvero:
    // readAdmins
    // readStudents
    // this is the way to access the users' infos
    ipfsLoading: state.ipfs.loading

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // these are: teacher, admin, student. Choose which one you want!
    readAdmins: bindActionCreators(readUsersFromDatabase, dispatch)
    // see 
  }
}

const readAdminsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Administrators)

export default readAdminsContainer