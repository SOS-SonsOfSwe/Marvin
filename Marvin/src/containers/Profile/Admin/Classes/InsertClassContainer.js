import { connect } from 'react-redux'
import InsertClass from '../../../../components/Profile/Admin/Classes/InsertClass'
import addNewClass from '../../../../redux/actions/Admin/AddClass'
import { bindActionCreators } from 'redux'
import { readTeachersFromDatabase } from '../../../../redux/actions/Admin/readTeachers'



const mapStateToProps = (state, ownProps) => {
  return {
    year: ownProps.location.state.year,
    degreeUnicode: ownProps.location.state.degreeUnicode,
    teachers: state.admin.readTeachers.payload,
    success: state.admin.readTeachers.success,
    loading: state.admin.readTeachers.loading,
    empty: state.admin.readTeachers.empty

  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    addClass: addNewClass,
    readTeachers: bindActionCreators(readTeachersFromDatabase, dispatch)
  }
}


const InsertClassContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InsertClass)

export default InsertClassContainer