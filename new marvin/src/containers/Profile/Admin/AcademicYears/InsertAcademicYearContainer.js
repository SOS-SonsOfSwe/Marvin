import { connect } from 'react-redux'
import InsertAcademicYears from '../../../../components/Profile/Admin/AcademicYears/InsertAcademicYear'
import { addNewAcademicYear } from '../../../../redux/actions/Insert/Admin/AddAcademicYear'

const mapStateToProps = (state, ownProps) => {
  return {
    adding: this.state.admin.adding,
    success: this.state.admin.success,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addAcademicYear: (year) => {
      dispatch(addNewAcademicYear(year))
    }
  }
}

const InsertAcademicYearsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InsertAcademicYears)

export default InsertAcademicYearsContainer