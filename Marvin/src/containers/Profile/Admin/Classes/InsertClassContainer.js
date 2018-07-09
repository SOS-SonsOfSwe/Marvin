import { connect } from 'react-redux'
import InsertClass from '../../../../components/Profile/Admin/Classes/InsertClass'
import addNewClass from '../../../../redux/actions/Admin/AddClass'

const mapStateToProps = (state, ownProps) => {
  return {
    adding: state.admin.adding,
    success: state.admin.success,
    year: ownProps.location.state.year,
    degreeUnicode: ownProps.location.state.degreeUnicode
  }
}


const mapDispatchToProps = {
  addClass: addNewClass
}

const InsertClassContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InsertClass)

export default InsertClassContainer