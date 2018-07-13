import { connect } from 'react-redux'
import InsertDegree from '../../../../components/Profile/Admin/Degrees/InsertDegree'
import addNewDegree from '../../../../redux/actions/Admin/AddDegree'


const mapStateToProps = (state, ownProps) => {
  return {
    adding: state.admin.adding,
    success: state.admin.success,
    year: ownProps.location.state.year
  }
}


const mapDispatchToProps = {
  addDegree: addNewDegree
}

const InsertDegreeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InsertDegree)

export default InsertDegreeContainer