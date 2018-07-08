import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Classes from '../../../../components/Profile/Admin/Classes/Classes'

// import { readClassesFromDatabase } from '../../../../redux/actions/Admin/readAdminData'
import { readClassesFromDatabase } from '../../../../redux/actions/Admin/readClasses'
import { readDegreesFromDatabase } from '../../../../redux/actions/Admin/readDegrees'
import { readAcademicYearsFromDatabase } from '../../../../redux/actions/Admin/readAcademicYears'

const mapStateToProps = (state, ownProps) => {
  return {
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
    readClassesData: bindActionCreators(readClassesFromDatabase, dispatch),
    readDegreeData: bindActionCreators(readDegreesFromDatabase, dispatch),
    readAcademicData: bindActionCreators(readAcademicYearsFromDatabase, dispatch)
  }
}

const ClassesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Classes)

export default ClassesContainer