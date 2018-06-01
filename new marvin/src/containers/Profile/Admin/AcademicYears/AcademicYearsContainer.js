import { connect } from 'react-redux'
import AcademicYears from '../../../../components/Profile/Admin/AcademicYears/AcademicYears'
import { readAcademicYearDataFromDatabase } from '../../../../redux/actions/Read/readAdminData'

// This container is read-only, so there's no need for mapping dispatch actions to the store.
// This connect is only for connecting the AcademicYears component to the store

const mapStateToProps = (state, ownProps) => {
  return {
    academicYearsData: state.admin.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    readAcademicData: () => {
      dispatch(readAcademicYearDataFromDatabase())
    }
  }
}

const AcademicYearsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AcademicYears)

export default AcademicYearsContainer
// export default connect(state => ({ uniData: state.user.data }))(AcademicYears)