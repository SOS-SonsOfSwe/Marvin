import { connect } from 'react-redux'
import InsertUserForm from '../../components/InsertUser/InsertUserForm'
import { insertUser } from '../../redux/actions/Admin/InsertUserFormAction'
import { bindActionCreators } from 'redux'
import { readDegreesFromDatabase } from '../../redux/actions/Admin/readDegrees'
import { readAcademicYearsFromDatabase } from '../../redux/actions/Admin/readAcademicYears'

const mapStateToProps = (state, ownProps) => {
  return {
    isUni: state.user.isUni,
    typeChecked: (ownProps.type !== undefined) ? ownProps.type : 3,

    degrees: state.admin.degrees.payload,
    successDegree: state.admin.degrees.success,
    academicYears: state.admin.academicYears.payload,
    classes: state.admin.classes.payload,
    loadingClasses: state.admin.classes.loading,
    loadingDegree: state.admin.degrees.loading,
    loadingAcademic: state.admin.academicYears.loading,
    success: state.admin.classes.success,
    somethingChanged: state.admin.degrees.somethingChanged,
    emptyClasses: state.admin.classes.empty,
    emptyDegrees: state.admin.degrees.empty,
    emptyAcademicYears: state.admin.academicYears.empty,

    ipfsLoading: state.ipfs.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onInsertUserFormSubmit: bindActionCreators(insertUser, dispatch),
    readDegreeData: bindActionCreators(readDegreesFromDatabase, dispatch),
    readAcademicData: bindActionCreators(readAcademicYearsFromDatabase, dispatch)
  }
}

const InsertUserFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InsertUserForm)

export default InsertUserFormContainer