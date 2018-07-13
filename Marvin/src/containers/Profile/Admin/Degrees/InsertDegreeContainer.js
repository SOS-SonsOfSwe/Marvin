import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import InsertDegree from '../../../../components/Profile/Admin/Degrees/InsertDegree'
import addNewDegree from '../../../../redux/actions/Admin/AddDegree'
import { readAcademicYearsFromDatabase } from '../../../../redux/actions/Admin/readAcademicYears'


const mapStateToProps = (state, ownProps) => {
  return {
    adding: state.admin.adding,
    success: state.admin.success,
    year: ownProps.location.state.year,

    academicYears: state.admin.academicYears.payload,
    loadingAcademic: state.admin.academicYears.loading,
    emptyAcademicYears: state.admin.academicYears.empty,
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    addDegree: addNewDegree,
    readAcademicData: bindActionCreators(readAcademicYearsFromDatabase, dispatch)
  }
}

const InsertDegreeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InsertDegree)

export default InsertDegreeContainer