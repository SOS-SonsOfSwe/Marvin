import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Degrees from '../../../../components/Profile/Admin/Degrees/Degrees'
// import { readDegreesFromDatabase } from '../../../../redux/actions/Admin/readAdminData'
import { readDegreesFromDatabase } from '../../../../redux/actions/Admin/readDegrees'
import { readAcademicYearsFromDatabase } from '../../../../redux/actions/Admin/readAcademicYears'
// This container is read-only, so there's no need for mapping dispatch actions to the store.
// This connect is only for connecting the AcademicYears component to the store

const mapStateToProps = (state, ownProps) => {
  return {
    degrees: state.admin.degrees.payload,
    academicYears: state.admin.academicYears.payload,
    loadingDegree: state.admin.degrees.loading,
    loadingAcademic: state.admin.academicYears.loading,
    success: state.admin.degrees.success,
    somethingChanged: state.admin.degrees.somethingChanged,
    emptyDegrees: state.admin.degrees.empty,
    emptyAcademicYears: state.admin.academicYears.empty,

    ipfsLoading: state.ipfs.loading
  }
}

// const mapDispatchToProps = {
//   readDegreeData: readDegreesFromDatabase
// }
const mapDispatchToProps = (dispatch) => {
  return {
    readDegreeData: bindActionCreators(readDegreesFromDatabase, dispatch),
    readAcademicData: bindActionCreators(readAcademicYearsFromDatabase, dispatch)
  }
}

const DegreesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Degrees)

export default DegreesContainer
// export default connect(state => ({ uniData: state.user.data }))(AcademicYears)